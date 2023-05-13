import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';

export const USER_FEATURE_KEY = 'user';

/*
 * Update these interfaces according to your requirements.
 */
export interface FlowCollaboratorsEntity {
  id: string;
  name: string;
  initials: string;
}
export interface FlowEntity {
  id: string;
  title: string;
  stringifiedNodes: string;
  stringifiedEdges: string;
  owner: boolean;
  colaborators?: FlowCollaboratorsEntity[];
}
export interface UserEntity {
  id: string;
  name: string;
  initials: string;
  email: string;
  flows: FlowEntity[];
  profileImg?: string;
}

export interface UserState extends EntityState<UserEntity> {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  userData: UserEntity;
  error?: string | null;
}

export const userAdapter = createEntityAdapter<UserEntity>();

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
 *   dispatch(fetchUser())
 * }, [dispatch]);
 * ```
 */
export const fetchUser = createAsyncThunk(
  'user/fetchStatus',
  async (_, thunkAPI) => {
    /**
     * Replace this with your custom fetch call.
     * For example, `return myApi.getUsers()`;
     * Right now we just return an empty array.
     */
    return Promise.resolve([]);
  }
);

export const initialUserState: UserState = userAdapter.getInitialState({
  loadingStatus: 'not loaded',
  userData: {
    id: '',
    name: '',
    initials: '',
    email: '',
    flows: [],
  },
  error: null,
});

export const userSlice = createSlice({
  name: USER_FEATURE_KEY,
  initialState: initialUserState,
  reducers: {
    setLoadingStatus: (
      state,
      action: PayloadAction<'not loaded' | 'loading' | 'loaded' | 'error'>
    ) => {
      state.loadingStatus = action.payload;
    },
    updateUserData: (state: UserState, action: PayloadAction<UserEntity>) => {
      state.userData = action.payload;
    },
    updateUserFlows: (state: UserState, action: PayloadAction<FlowEntity>) => {
      const user = state.userData;
      user.flows = [...user.flows, action.payload];
    },
    removeUserFlow: (state: UserState, action: PayloadAction<string>) => {
      const filteredFlows = state.userData.flows.filter(
        (flow) => flow.id !== action.payload
      );
      state.userData.flows = [...filteredFlows];
    },
  },
});

/*
 * Export reducer for store configuration.
 */
export const userReducer = userSlice.reducer;

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
 *   dispatch(userActions.add({ id: 1 }))
 * }, [dispatch]);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#usedispatch
 */
export const userActions = userSlice.actions;

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 *
 * e.g.
 * ```
 * import { useSelector } from 'react-redux';
 *
 * // ...
 *
 * const entities = useSelector(selectAllUser);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#useselector
 */
const { selectAll, selectEntities } = userAdapter.getSelectors();

export const getUserState = (rootState: any): UserState =>
  rootState[USER_FEATURE_KEY];

export const selectAllUser = createSelector(getUserState, selectAll);

export const selectUserEntities = createSelector(getUserState, selectEntities);
