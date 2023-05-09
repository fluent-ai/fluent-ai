// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';
import { SignIn } from '@libs/auth';
import {SignUp} from '@libs/auth';
import {AuthDetails} from '@libs/auth'

import NxWelcome from './nx-welcome';

export function App() {
  return (
    <div>
      {/* <NxWelcome title="toolai" /> */}
      <SignIn />
      <SignUp />
      <AuthDetails />
    </div>
  );
}

export default App;
