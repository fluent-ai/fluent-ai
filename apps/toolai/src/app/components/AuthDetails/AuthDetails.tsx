import styles from './AuthDetails.module.css';
import React, {useEffect, useState} from 'react'
import  {auth } from '../../../firebase-init';
import { onAuthStateChanged,signOut } from 'firebase/auth';

/* eslint-disable-next-line */
export interface AuthDetailsProps {}

export function AuthDetails(props: AuthDetailsProps) {
  interface userData {
  email: string |null;
}
const initialState:userData = {
  email: null,
}

  // const [authUser, setAuthUser] = useState<{email:null,password:null} | null>(null)
  const [authUser, setAuthUser] = useState(initialState)

  useEffect(() => {
    const listen = onAuthStateChanged(auth, user =>{
      if (user){
        setAuthUser(user);
      }else{
        setAuthUser(initialState);
      }});
      return () => {
        listen();
      };
  },[]);

  const  userSignOut = ()=>{
    signOut(auth).then(()=>{
      console.log('sign out successful')
  }).catch((error)=>{
    console.log(error)
  })
}
  return (
    <div >{authUser.email ? <><p>{`Signed In as ${authUser.email}`}</p><button onClick={userSignOut}>Sign Out</button></> : <p>Signed Out</p>}
    </div>

  );
}

export default AuthDetails;
