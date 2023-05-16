import styles from './GoogleLogin.module.css';
import { signInWithPopup, GoogleAuthProvider, getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import * as firestoreService from '@libs/firestore-service';
import { User } from '@tool-ai/ui';
import { addFlowFromSharedLink } from '../shared-link-handler';
import { store, userActions, UserEntity } from '@tool-ai/state';
import { current } from '@reduxjs/toolkit';
import { arrayUnion } from 'firebase/firestore';
import { dispatchToStore, createNewUser } from '../load-userdata';

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
          navigate('/dashboard');
        } else {
          if (user.displayName && user.email && user.photoURL) {
            const newUser = createNewUser(user);
            dispatchToStore(newUser);
            navigate('/dashboard');
          }
        }
      });
  };

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        store.dispatch(userActions.setLoadingStatus('loading'));
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;

        // check for a sharing link
        const sharingLinkMatch = window.location.href.match(/\?link=(.*)/);
        if (sharingLinkMatch) {
          const sharingLink = sharingLinkMatch[1];
          const userIdMatch = sharingLink.match(/(.*)-\d*/) || '';
          firestoreService
            .getSomeFromDB('users', 'id', '==', userIdMatch[1])
            .then((users) => {
              if (users.length > 0) {
                const originalUserFlow = users[0].flows.find(
                  (flow: any) => flow.id === sharingLink
                );
                const newFlow = JSON.parse(JSON.stringify(originalUserFlow));
                originalUserFlow.colaborators.push({
                  id: user.uid,
                  name: user.displayName,
                  initials: user.displayName?.slice(0, 2).toUpperCase() || '',
                });
                newFlow.colaborators.push({
                  id: users[0].id,
                  name: users[0].name,
                  initials: users[0].initials,
                });

                firestoreService
                  .updateFirestoreDocument('users', user.uid, {
                    flows: arrayUnion(newFlow),
                  })
                  .then(() => {
                    firestoreService.updateFirestoreDocument(
                      'users',
                      users[0].id,
                      users[0]
                    );
                    loadAndRedirect(user);
                  });
              }
            });
        } else {
          loadAndRedirect(user);
        }
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // const email = error.customData.email;
        // const credential = GoogleAuthProvider.credentialFromError(error);
        console.log('error', error);
      });
  };
  return (
    <div className={styles.container}>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
  );
}

export default GoogleLogin;
