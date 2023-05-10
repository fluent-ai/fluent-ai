import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import './firebase-init';
import App from './app/app';

import { BrowserRouter } from 'react-router-dom';
// import * as auth from '@libs/auth';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
