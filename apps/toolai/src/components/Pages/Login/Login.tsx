import { SignIn, AuthDetails } from '@libs/auth';
import { Link } from 'react-router-dom';
import { GoogleLogin } from '@libs/auth';
// export interface LoginProps {}

export function Login() {
  return (
    <div className="mx-auto w-96 h-screen flex flex-col items-center justify-center">
      <h1 className="text-left">Welcome</h1>
      <SignIn />
      <GoogleLogin />
      <Link to="/register">New here? Create an Account</Link>
    </div>
  );
}

export default Login;
