import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import './firebase-init';
import App from './app/app';
import { FlowStateProvider } from '@tool-ai/state';
// import * as auth from '@libs/auth';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <StrictMode>
      <FlowStateProvider>
       <BrowserRouter>
         <App />
       </BrowserRouter>
      </FlowStateProvider>
  </StrictMode>
);
