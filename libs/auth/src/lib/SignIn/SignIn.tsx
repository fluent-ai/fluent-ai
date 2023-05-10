import styles from './SignIn.module.css';
import React, {useState} from 'react';
// import  {auth } from '../../../firebase-init';
import {signInWithEmailAndPassword, getAuth} from 'firebase/auth';

/* eslint-disable-next-line */
export interface SignInProps {}
const auth = getAuth();

export function SignIn(props: SignInProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const signIn = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth,email, password)
    .then((userCredential) => {
      console.log(userCredential);

    }).catch((error)=> {
      console.log(error);
    });

  }


  return (
    <div className="sign-in-container">
      <form onSubmit={signIn}>

      <h1>Log In to your account</h1>
      <input type="email" placeholder="Enter your email" value={email} onChange={e=> setEmail(e.target.value)}/>
      <input type="password" placeholder="Enter your password" value={password} onChange={e=> setPassword(e.target.value)}/>
      <button type="submit">Log In</button>
      </form>
    </div>
  );
}

export default SignIn;
