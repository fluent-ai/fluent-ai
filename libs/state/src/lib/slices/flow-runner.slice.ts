import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';

export const FLOW_RUNNER_FEATURE_KEY = 'flowRunner';

/*
 * Update these interfaces according to your requirements.
 */
export interface FlowRunnerEntity {
  id: number;
}

export interface FlowRunnerState extends EntityState<FlowRunnerEntity> {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  error: string | null | undefined;
}

export const flowRunnerAdapter = createEntityAdapter<FlowRunnerEntity>();

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
 *   dispatch(fetchFlowRunner())
 * }, [dispatch]);
 * ```
 */
export const fetchFlowRunner = createAsyncThunk(
  'flowRunner/fetchStatus',
  async (_, thunkAPI) => {
    /**
     * Replace this with your custom fetch call.
     * For example, `return myApi.getFlowRunners()`;
     * Right now we just return an empty array.
     */
    return Promise.resolve([]);
  }
);

export const initialFlowRunnerState: FlowRunnerState =
  flowRunnerAdapter.getInitialState({
    loadingStatus: 'not loaded',
    error: null,
  });

export const flowRunnerSlice = createSlice({
  name: FLOW_RUNNER_FEATURE_KEY,
  initialState: initialFlowRunnerState,
  reducers: {
    setLoadingStatus: (state, action: PayloadAction<'not loaded' | 'loading' | 'loaded' | 'error'>) => {
      state.loadingStatus = action.payload;
    },
  }
});

/*
 * Export reducer for store configuration.
 */
export const flowRunnerReducer = flowRunnerSlice.reducer;

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
 *   dispatch(flowRunnerActions.add({ id: 1 }))
 * }, [dispatch]);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#usedispatch
 */
export const flowRunnerActions = flowRunnerSlice.actions;

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 *
 * e.g.
 * ```
 * import { useSelector } from 'react-redux';
 *
 * // ...
 *
 * const entities = useSelector(selectAllFlowRunner);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#useselector
 */
const { selectAll, selectEntities } = flowRunnerAdapter.getSelectors();

export const getFlowRunnerState = (rootState: unknown): FlowRunnerState =>
  //@ts-expect-error TODO: Come back and fix after MVP presentation
  rootState[FLOW_RUNNER_FEATURE_KEY];

export const selectAllFlowRunner = createSelector(
  getFlowRunnerState,
  selectAll
);

export const selectFlowRunnerEntities = createSelector(
  getFlowRunnerState,
  selectEntities
);
