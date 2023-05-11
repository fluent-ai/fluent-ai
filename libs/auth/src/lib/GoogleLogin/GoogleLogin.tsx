import styles from './GoogleLogin.module.css';
import { signInWithPopup, GoogleAuthProvider, getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import * as firestoreService from '@libs/firestore-service';
import { User } from '@tool-ai/ui';
// import provider from 'firebase/auth';

/* eslint-disable-next-line */

// export interface GoogleLoginProps {}

const auth = getAuth();
export function GoogleLogin() {
  // creating the sign in with google react component
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  const signInWithGoogle = () => {
    console.log('sign in with google');
    console.log('auth', auth, provider);
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log('result', result);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        console.log('userCredential', credential);
        const token = credential?.accessToken;
        const user = result.user;
        if (user.displayName && user.email && user.photoURL) {
          const newUser: User = {
            id: user.uid,
            email: user.email,
            name: user.displayName,
            initials: user.displayName?.slice(0, 2).toUpperCase(),
            profileImg: user.photoURL,
          };
          firestoreService.writeToDB('users', newUser);
          navigate('/');
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
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
