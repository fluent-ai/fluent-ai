// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import NxWelcome from './nx-welcome';
import AuthDetails from './components/AuthDetails/AuthDetails';

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
