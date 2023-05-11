/* eslint-disable-next-line */
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { FLOW_RUNNER_FEATURE_KEY, flowRunnerReducer } from './slices/flow-runner.slice';


export const store = configureStore({
  reducer: { [FLOW_RUNNER_FEATURE_KEY]: flowRunnerReducer },
  // Additional middleware can be passed to this array
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
  // Optional Redux store enhancers
  enhancers: [],
});

export function FlowStateProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}


