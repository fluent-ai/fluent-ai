import styles from './GoogleLogin.module.css';
import { signInWithPopup, GoogleAuthProvider, getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import * as firestoreService from '@libs/firestore-service';
import { User } from '@tool-ai/ui';
import { store, userActions } from '@tool-ai/state';
import { dispatchToStore, createNewUser } from '../load-userdata';
import {
  addFlowFromSharedLink,
  addFlowCopyFromLink,
} from '../shared-link-handler';

const auth = getAuth();
export function GoogleLogin() {
  // creating the sign in with google react component
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

  const loadAndRedirect = async (user: any) => {
    const users = await firestoreService.getSomeFromDB(
      'users',
      'id',
      '==',
      user.uid
    );
    if (users.length > 0) {
      await addFlowFromSharedLink(users[0] as User);
      await addFlowCopyFromLink(users[0] as User);
      // store user state in redux
      await dispatchToStore(users[0] as User);
      navigate('/dashboard');
    } else {
      if (user.displayName && user.email && user.photoURL) {
        const newUser = await createNewUser(user);
        await dispatchToStore(newUser);
        await addFlowFromSharedLink(newUser);
        await addFlowCopyFromLink(newUser);
        navigate('/dashboard');
      }
    }
  };

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      store.dispatch(userActions.setLoadingStatus('loading'));
      const user = result.user;
      console.log(user);
      loadAndRedirect(user);
    } catch (error) {
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // const email = error.customData.email;
      // const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(`error occured during login: `, error);
      store.dispatch(userActions.setLoadingStatus('error'));
    }
  };
  return (
    <div className={styles.container}>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
  );
}

export default GoogleLogin;
