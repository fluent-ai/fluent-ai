import { v4 as uuidv4 } from 'uuid';
import {
  createEntityAdapter,
  createSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

export const GENERAL_FEATURE_KEY = 'general';

export interface GeneralState {
  id: string;
}

export const generalAdapter = createEntityAdapter<GeneralState>();

export const initialGeneralState: GeneralState = generalAdapter.getInitialState(
  {
    id: uuidv4(),
  }
);

export const generalSlice = createSlice({
  name: GENERAL_FEATURE_KEY,
  initialState: initialGeneralState,
  reducers: {
    setId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
  },
});

export const generalReducer = generalSlice.reducer;
export const generalActions = generalSlice.actions;
export const getGeneralState = (rootState: any): GeneralState =>
  rootState[GENERAL_FEATURE_KEY];

const getId = createSelector(getGeneralState, (state) => state.id);

export const generalSelectors = {
  getId,
};
