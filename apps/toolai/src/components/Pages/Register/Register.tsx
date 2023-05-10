/* eslint-disable-next-line */
import {SignUp, AuthDetails } from '@libs/auth';
// export interface RegisterProps {}

export function Register() {
  return (
    <div className='mx-auto'>
      <SignUp />
      <AuthDetails />
    </div>
  );
}

export default Register;
