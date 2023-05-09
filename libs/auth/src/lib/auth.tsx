import styles from './auth.module.css';
import { signUp } from './createUser';

/* eslint-disable-next-line */
export interface AuthProps {}

export function Auth(props: AuthProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Auth!</h1>
      <button onClick={() => signUp('julienlook@gmx.de', 'asd')}>
        SIGN UP
      </button>
    </div>
  );
}

export default Auth;
