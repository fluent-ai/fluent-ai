import styles from './GoogleLogin.module.css';
import { signInWithPopup, GoogleAuthProvider, getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import * as firestoreService from '@libs/firestore-service';
import { User } from '@tool-ai/ui';
import { store, userActions, UserEntity } from '@tool-ai/state';

const auth = getAuth();
export function GoogleLogin() {
  // creating the sign in with google react component
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        store.dispatch(userActions.setLoadingStatus('loading'));
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;

        firestoreService
          .getSomeFromDB('users', 'id', '==', user.uid)
          .then((users) => {
            if (users.length > 0) {
              // store user state in redux

              store.dispatch(
                userActions.updateUserData(users[0] as UserEntity)
              );
              store.dispatch(userActions.setLoadingStatus('loaded'));
              console.log(
                'google login, current user state: ',
                store.getState().user.userData
              );
              navigate('/');
            } else {
              if (user.displayName && user.email && user.photoURL) {
                const newUser: User = {
                  id: user.uid,
                  email: user.email,
                  name: user.displayName,
                  initials: user.displayName?.slice(0, 2).toUpperCase(),
                  flows: [
                    {
                      id: 'tab1',
                      title: 'Flow 1',
                      stringifiedNodes: '',
                      stringifiedEdges: '',
                      owner: true,
                      colaborators: [],
                    },
                  ],
                  profileImg: user.photoURL,
                };

                firestoreService.writeToDB('users', newUser);
                store.dispatch(
                  userActions.updateUserData(newUser as UserEntity)
                );

                //store.dispatch(flowtabsActions.addFlowTab(newUser.flows[0]));
                store.dispatch(userActions.setLoadingStatus('loaded'));
                console.log(store.getState().user.userData);
                navigate('/');
              }
            }
          });
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
