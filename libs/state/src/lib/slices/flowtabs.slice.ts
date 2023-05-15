import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';
import * as flow from 'reactflow';

export const FLOW_TAB_FEATURE_KEY = 'flowTab';

/*
 * Update these interfaces according to your requirements.
 */

interface FlowCollaborators {
  id: string;
  name: string;
  initials: string;
}

export interface FlowTabEntity {
  id: string;
  title: string;
  ownerId: string;
  nodes: any[];
  edges: any[];
  collaboratorIds: string[];
  collaborators: FlowCollaborators[];
}
export interface TabsEntity {
  activeId: string;
  flows: FlowTabEntity[];
}

export interface FlowTabsState extends EntityState<TabsEntity> {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  flowTabs: TabsEntity;
  error?: string | null;
}

export const flowTabAdapter = createEntityAdapter<TabsEntity>();

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
 *   dispatch(fetchFlowTab())
 * }, [dispatch]);
 * ```
 */
export const fetchFlowTab = createAsyncThunk(
  'flowTab/fetchStatus',
  async (_, thunkAPI) => {
    /**
     * Replace this with your custom fetch call.
     * For example, `return myApi.getFlowTabs()`;
     * Right now we just return an empty array.
     */
    return Promise.resolve([]);
  }
);

export const initialFlowTabState: FlowTabsState =
  flowTabAdapter.getInitialState({
    loadingStatus: 'not loaded',
    flowTabs: {
      activeId: '',
      flows: [],
    },
    error: null,
  });

export const flowTabSlice = createSlice({
  name: FLOW_TAB_FEATURE_KEY,
  initialState: initialFlowTabState,
  reducers: {
    setActiveFlowTab: (state: FlowTabsState, action: PayloadAction<string>) => {
      state.flowTabs.activeId = action.payload;
    },
    saveCurrentFlowTab: (
      state: FlowTabsState,
      action: PayloadAction<FlowTabEntity>
    ) => {
      const flowIndex = state.flowTabs.flows.findIndex(
        (f) => f.id === state.flowTabs.activeId
      );
      state.flowTabs.flows[flowIndex] = action.payload;
    },
    addNewFlowTab: (
      state: FlowTabsState,
      action: PayloadAction<FlowTabEntity>
    ) => {
      const currentIds = state.flowTabs.flows.map((f) => f.id);
      if (!currentIds.includes(action.payload.id)) {
        state.flowTabs.activeId = action.payload.id;
        state.flowTabs.flows = [...state.flowTabs.flows, action.payload];
      }
    },
    removeActiveFlowTab: (state: FlowTabsState) => {
      const flows = state.flowTabs.flows;
      const activeTabIndex = flows.findIndex(
        (f) => f.id === state.flowTabs.activeId
      );
      state.flowTabs.flows = [
        ...flows.filter((f) => f.id !== state.flowTabs.activeId),
      ];
      if (flows.length > 1) {
        let newTabIndex = 0;
        if (activeTabIndex !== 0) {
          newTabIndex = activeTabIndex - 1;
        }
        state.flowTabs.activeId = flows[newTabIndex].id;
      } else {
        state.flowTabs.activeId = '';
      }
    },
  },
});

/*
 * Export reducer for store configuration.
 */
export const flowTabReducer = flowTabSlice.reducer;

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
 *   dispatch(flowTabActions.add({ id: 1 }))
 * }, [dispatch]);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#usedispatch
 */
export const flowTabActions = flowTabSlice.actions;

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 *
 * e.g.
 * ```
 * import { useSelector } from 'react-redux';
 *
 * // ...
 *
 * const entities = useSelector(selectAllflowTab);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#useselector
 */
const { selectAll, selectEntities } = flowTabAdapter.getSelectors();

export const getflowTabState = (rootState: any): FlowTabsState =>
  rootState[FLOW_TAB_FEATURE_KEY];

export const selectAllflowTab = createSelector(getflowTabState, selectAll);

export const selectflowTabEntities = createSelector(
  getflowTabState,
  selectEntities
);
