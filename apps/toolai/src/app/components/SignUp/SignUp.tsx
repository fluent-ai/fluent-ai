import styles from './SignUp.module.css';

/* eslint-disable-next-line */
export interface SignUpProps {}

export function SignUp(props: SignUpProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to SignUp!</h1>
    </div>
  );
}

export default SignUp;
