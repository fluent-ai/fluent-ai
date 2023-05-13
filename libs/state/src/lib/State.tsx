/* eslint-disable-next-line */
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import {
  FLOW_RUNNER_FEATURE_KEY,
  flowRunnerReducer,
} from './slices/flow-runner.slice';
import { USER_FEATURE_KEY, userReducer } from './slices/user.slice';
import {
  ACTIVE_TAB_FEATURE_KEY,
  activeTabReducer,
} from './slices/active-tab.slice';

export const store = configureStore({
  reducer: {
    [FLOW_RUNNER_FEATURE_KEY]: flowRunnerReducer,
    [USER_FEATURE_KEY]: userReducer,
    [ACTIVE_TAB_FEATURE_KEY]: activeTabReducer,
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
