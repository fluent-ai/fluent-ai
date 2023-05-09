import styles from './SignIn.module.css';
import React, {useState} from 'react';
import { auth } from '@libs/auth';
import {createUserWithEmailAndPassowrd} from '@libs/firebase';

/* eslint-disable-next-line */
export interface SignUPProps {}

export function SignUp(props: SignInProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const signUp = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth,email, password)
    .then((userCredential) => {
      console.log(userCredential);

    }).catch((error)=> {
      console.log(error);
    });

  }


  return (
    <div className="sign-in-container">
      <form onSubmit={signUp}>

      <h1>Create an account</h1>
      <input type="email" placeholder="Enter your email" value={email} onChange={e=> setEmail(e.target.value)}/>
      <input type="password" placeholder="Enter your password" value={password} onChange={e=> setPassword(e.target.value)}/>
      <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
