import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';

export const FLOWTABS_FEATURE_KEY = 'flowtabs';

/*
 * Update these interfaces according to your requirements.
 */
export interface FlowtabsEntity {
  value: string;
  title: string;
  colaborators?: [{ id: string; name: string; initials: string }];
}

export interface FlowtabsState extends EntityState<FlowtabsEntity> {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  tabs: FlowtabsEntity[];
  error?: string | null;
}

export const flowtabsAdapter = createEntityAdapter<FlowtabsEntity>();

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
 *   dispatch(fetchFlowtabs())
 * }, [dispatch]);
 * ```
 */
export const fetchFlowtabs = createAsyncThunk(
  'flowtabs/fetchStatus',
  async (_, thunkAPI) => {
    /**
     * Replace this with your custom fetch call.
     * For example, `return myApi.getFlowtabss()`;
     * Right now we just return an empty array.
     */
    return Promise.resolve([]);
  }
);

export const initialFlowtabsState: FlowtabsState =
  flowtabsAdapter.getInitialState({
    loadingStatus: 'not loaded',
    tabs: [],
    error: null,
  });

export const flowtabsSlice = createSlice({
  name: FLOWTABS_FEATURE_KEY,
  initialState: initialFlowtabsState,
  reducers: {
    setLoadingStatus: (
      state,
      action: PayloadAction<'not loaded' | 'loading' | 'loaded' | 'error'>
    ) => {
      state.loadingStatus = action.payload;
    },
    addFlowTab: (
      state: FlowtabsState,
      action: PayloadAction<FlowtabsEntity>
    ) => {
      // TODO: we need to update collaborators in a nested array!
      state.tabs = [...state.tabs, action.payload];
    },
  },
});

/*
 * Export reducer for store configuration.
 */
export const flowtabsReducer = flowtabsSlice.reducer;

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
 *   dispatch(flowtabsActions.add({ id: 1 }))
 * }, [dispatch]);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#usedispatch
 */
export const flowtabsActions = flowtabsSlice.actions;

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 *
 * e.g.
 * ```
 * import { useSelector } from 'react-redux';
 *
 * // ...
 *
 * const entities = useSelector(selectAllFlowtabs);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#useselector
 */
const { selectAll, selectEntities } = flowtabsAdapter.getSelectors();

export const getFlowtabsState = (rootState: any): FlowtabsState =>
  rootState[FLOWTABS_FEATURE_KEY];

export const selectAllFlowtabs = createSelector(getFlowtabsState, selectAll);

export const selectFlowtabsEntities = createSelector(
  getFlowtabsState,
  selectEntities
);
