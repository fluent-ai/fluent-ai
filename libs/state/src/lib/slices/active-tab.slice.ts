import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';

export const ACTIVE_TAB_FEATURE_KEY = 'activeTab';

/*
 * Update these interfaces according to your requirements.
 */
export interface ActiveTabEntity {
  id: string;
}

export interface ActiveTabState extends EntityState<ActiveTabEntity> {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  id: string;
  error?: string | null;
}

export const activeTabAdapter = createEntityAdapter<ActiveTabEntity>();

/**
 * Export an effect using createAsyncThunk from
 * the Redux Toolkit: https://redux-toolkit.js.org/api/createAsyncThunk
 *
 * e.g.
 * ```
 * import React, { useEffect } from 'react';
 * import { useDispatch } from 'react-redux';
 *
 * // ...
 *
 * const dispatch = useDispatch();
 * useEffect(() => {
 *   dispatch(fetchActiveTab())
 * }, [dispatch]);
 * ```
 */
export const fetchActiveTab = createAsyncThunk(
  'activeTab/fetchStatus',
  async (_, thunkAPI) => {
    /**
     * Replace this with your custom fetch call.
     * For example, `return myApi.getActiveTabs()`;
     * Right now we just return an empty array.
     */
    return Promise.resolve([]);
  }
);

export const initialActiveTabState: ActiveTabState =
  activeTabAdapter.getInitialState({
    loadingStatus: 'not loaded',
    id: '',
    error: null,
  });

export const activeTabSlice = createSlice({
  name: ACTIVE_TAB_FEATURE_KEY,
  initialState: initialActiveTabState,
  reducers: {
    setActiveTab: (state: ActiveTabState, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
  },
});

/*
 * Export reducer for store configuration.
 */
export const activeTabReducer = activeTabSlice.reducer;

/*
 * Export action creators to be dispatched. For use with the `useDispatch` hook.
 *
 * e.g.
 * ```
 * import React, { useEffect } from 'react';
 * import { useDispatch } from 'react-redux';
 *
 * // ...
 *
 * const dispatch = useDispatch();
 * useEffect(() => {
 *   dispatch(activeTabActions.add({ id: 1 }))
 * }, [dispatch]);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#usedispatch
 */
export const activeTabActions = activeTabSlice.actions;

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 *
 * e.g.
 * ```
 * import { useSelector } from 'react-redux';
 *
 * // ...
 *
 * const entities = useSelector(selectAllActiveTab);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#useselector
 */
const { selectAll, selectEntities } = activeTabAdapter.getSelectors();

export const getActiveTabState = (rootState: any): ActiveTabState =>
  rootState[ACTIVE_TAB_FEATURE_KEY];

export const selectAllActiveTab = createSelector(getActiveTabState, selectAll);

export const selectActiveTabEntities = createSelector(
  getActiveTabState,
  selectEntities
);
