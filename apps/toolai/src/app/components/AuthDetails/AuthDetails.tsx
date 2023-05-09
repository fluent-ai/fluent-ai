import styles from './AuthDetails.module.css';

/* eslint-disable-next-line */
export interface AuthDetailsProps {}

export function AuthDetails(props: AuthDetailsProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to AuthDetails!</h1>
    </div>
  );
}

export default AuthDetails;
