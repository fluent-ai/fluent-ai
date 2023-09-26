import { v4 as uuidv4 } from 'uuid';
import {
  createEntityAdapter,
  createSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { getFips } from 'crypto';

export const GENERAL_FEATURE_KEY = 'general';

export interface GeneralState {
  id: string;
  remoteRunner: {
    enabled: boolean;
    status: 'disconnected' | 'connecting' | 'connected' | 'error';
    ip: string;
    port: number;
  };
  openAi: {
    useOwnKey: boolean;
    key: string;
  };
}

export const generalAdapter = createEntityAdapter<GeneralState>();

export const initialGeneralState: GeneralState = generalAdapter.getInitialState(
  {
    id: uuidv4(),
    remoteRunner: {
      enabled: false,
      status: 'disconnected',
      ip: '127.0.0.1',
      port: 8080,
    },
    openAi: {
      useOwnKey: false,
      key: '',
    },
  }
);

export const generalSlice = createSlice({
  name: GENERAL_FEATURE_KEY,
  initialState: initialGeneralState,
  reducers: {
    setId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    setRemoteRunnerEnabled: (state, action: PayloadAction<boolean>) => {
      state.remoteRunner.enabled = action.payload;
    },
    setRemoteRunnerStatus: (
      state,
      action: PayloadAction<GeneralState['remoteRunner']['status']>
    ) => {
      state.remoteRunner.status = action.payload;
    },
    setRemoteRunnerIp: (state, action: PayloadAction<string>) => {
      state.remoteRunner.ip = action.payload;
    },
    setRemoteRunnerPort: (state, action: PayloadAction<number>) => {
      state.remoteRunner.port = action.payload;
    },
    setOpenAiUseOwnKey: (state, action: PayloadAction<boolean>) => {
      state.openAi.useOwnKey = action.payload;
    },
    setOpenAiKey: (state, action: PayloadAction<string>) => {
      state.openAi.key = action.payload;
    },
  },
});

export const generalReducer = generalSlice.reducer;
export const generalActions = generalSlice.actions;
export const getGeneralState = (rootState: any): GeneralState =>
  rootState[GENERAL_FEATURE_KEY];

const getId = createSelector(getGeneralState, (state) => state.id);
const getRemoteRunnerEnabled = createSelector(
  getGeneralState,
  (state) => state.remoteRunner.enabled
);
const getRemoteRunnerStatus = createSelector(
  getGeneralState,
  (state) => state.remoteRunner.status
);
const getRemoteRunnerIp = createSelector(
  getGeneralState,
  (state) => state.remoteRunner.ip
);
const getRemoteRunnerPort = createSelector(
  getGeneralState,
  (state) => state.remoteRunner.port
);
const getRemoteRunner = createSelector(
  getGeneralState,
  (state) => state.remoteRunner
);
const getOpenAiUseOwnKey = createSelector(
  getGeneralState,
  (state) => state.openAi.useOwnKey
);
const getOpenAiKey = createSelector(
  getGeneralState,
  (state) => state.openAi.key
);

export const generalSelectors = {
  getId,
  getRemoteRunnerEnabled,
  getRemoteRunnerStatus,
  getRemoteRunnerIp,
  getRemoteRunnerPort,
  getRemoteRunner,
  getOpenAiUseOwnKey,
  getOpenAiKey,
};
