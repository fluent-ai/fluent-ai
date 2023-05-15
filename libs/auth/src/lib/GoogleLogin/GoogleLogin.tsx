import styles from './GoogleLogin.module.css';
import { signInWithPopup, GoogleAuthProvider, getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import * as firestoreService from '@libs/firestore-service';
import { User } from '@tool-ai/ui';
import { store, userActions } from '@tool-ai/state';
import { dispatchToStore, createNewUser } from '../load-userdata';
import { arrayUnion } from 'firebase/firestore';

const auth = getAuth();
export function GoogleLogin() {
  // creating the sign in with google react component
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

  const loadAndRedirect = (user: any) => {
    firestoreService
      .getSomeFromDB('users', 'id', '==', user.uid)
      .then((users: any) => {
        if (users.length > 0) {
          // store user state in redux
          dispatchToStore(users[0] as User);
          navigate('/');
        } else {
          if (user.displayName && user.email && user.photoURL) {
            const newUser = createNewUser(user);
            dispatchToStore(newUser);
            navigate('/');
          }
        }
      });
  };

  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    if (result) {
      store.dispatch(userActions.setLoadingStatus('loading'));
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const user = result.user;

      // check for a sharing link
      const sharingLinkMatch = window.location.href.match(/\?link=(.*)/);
      if (sharingLinkMatch) {
        const sharingLink = sharingLinkMatch[1];
        const flows = await firestoreService.getSomeFromDB(
          'flows',
          'id',
          '==',
          sharingLink
        );
        if (flows.length > 0) {
          flows[0].collaborators.push({
            id: user.uid,
            name: user.displayName,
            initials: user.displayName?.slice(0, 2).toUpperCase() || '',
          });
          flows[0].collaboratorIds.push(user.uid);

          // update users collection
          await firestoreService.updateFirestoreDocument('users', user.uid, {
            flows: arrayUnion(flows[0].id),
          });

          // update flows collection
          await firestoreService.updateFirestoreDocument(
            'flows',
            flows[0].id,
            flows[0]
          );

          loadAndRedirect(user);
        }
      } else {
        loadAndRedirect(user);
      }
    } else {
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // const email = error.customData.email;
      // const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(`error occured couldn't login`);
    }
  };
  return (
    <div className={styles.container}>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
  );
}

export default GoogleLogin;
