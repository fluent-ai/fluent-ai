import styles from './SignIn.module.css';

/* eslint-disable-next-line */
export interface SignInProps {}

export function SignIn(props: SignInProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to SignIn!</h1>
    </div>
  );
}

export default SignIn;
