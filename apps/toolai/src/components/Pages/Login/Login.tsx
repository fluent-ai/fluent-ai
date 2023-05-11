
import { SignIn, AuthDetails } from '@libs/auth';

// export interface LoginProps {}

export function Login () {
  return (
    <div className='mx-auto h-screen flex flex-col items-center justify-center'>
        <h1>Welcome</h1>
        <SignIn />
      </div>

  );
}

export default Login;
