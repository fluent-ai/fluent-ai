/* eslint-disable-next-line */
import { SignIn, AuthDetails } from '@libs/auth';

// export interface LoginProps {}

export function Login () {
  return (
    <div className='mx-auto h-screen flex flex-col items-center justify-center'>
        <SignIn />
      </div>

  );
}

export default Login;
