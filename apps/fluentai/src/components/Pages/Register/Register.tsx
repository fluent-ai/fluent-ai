/* eslint-disable-next-line */
// import {SignUp, AuthDetails } from '@libs/auth';
import { Link } from 'react-router-dom';

// export interface RegisterProps {}

export function Register() {
  return (
    <div className='mx-auto h-screen flex flex-col items-center justify-center gap-y-7'>
      <h1>New User</h1>
      {/* <SignUp /> */}
      <Link to="/login">I have an Account</Link>
    </div>
  );
}

export default Register;
