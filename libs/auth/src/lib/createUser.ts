import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

export function signUp(email: string, password: string) {
  // TODO: add checks for email and password

  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);

      // push to DB
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      // send error
    });
}
