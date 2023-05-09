import styles from './SignIn.module.css';
import React, {useState} from 'react';
// import  {auth } from '../../../firebase-init';
import {createUserWithEmailAndPassword,getAuth} from 'firebase/auth';


/* eslint-disable-next-line */
export interface SignUpProps {}
const auth = getAuth();

export function SignUp(props: SignUpProps) {
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
