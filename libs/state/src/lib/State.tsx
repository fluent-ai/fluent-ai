/* eslint-disable-next-line */
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import {
  FLOW_RUNNER_FEATURE_KEY,
  flowRunnerReducer,
} from './slices/flow-runner.slice';
import { SUPABASE_FEATURE_KEY, supabaseReducer } from './slices/supabase.slice';
import { FLOW_FEATURE_KEY, flowReducer } from './slices/flow.slice';

export const store = configureStore({
  reducer: {
    [FLOW_RUNNER_FEATURE_KEY]: flowRunnerReducer,
    [SUPABASE_FEATURE_KEY]: supabaseReducer,
    [FLOW_FEATURE_KEY]: flowReducer,
    
  },
  // Additional middleware can be passed to this array
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
  // Optional Redux store enhancers
  enhancers: [],
});

export function StateProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
