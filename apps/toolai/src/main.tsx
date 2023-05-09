import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import './firebase-init';
import App from './app/app';
import { Auth } from '@libs/auth';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <Auth />
    <App />
  </StrictMode>
);
