// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import NxWelcome from './nx-welcome';

export function App() {
  return (
    <div>
      <NxWelcome title="toolai" />
      <SignIn />
      <SignUp />
    </div>
  );
}

export default App;
