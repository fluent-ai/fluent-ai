/* eslint-disable-next-line */
import {SignUp, AuthDetails } from '@libs/auth';
// export interface RegisterProps {}

export function Register() {
  return (
    <div className='mx-auto h-screen flex flex-col items-center justify-center'>
      <h1>New User</h1>
      <SignUp />
    </div>
  );
}

export default Register;
