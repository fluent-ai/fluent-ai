import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserCredential } from 'firebase/auth';
import { AppDispatch, RootState } from '../store';
import { auth } from '@libs/auth';

interface UserState {
  currentUser: null | UserCredential;
  error: string | null;
}

const initialState: UserState = {
  currentUser: null,
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<UserCredential>) => {
      state.currentUser = action.payload;
      state.error = null;
    },
    setLoginError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.currentUser = null;
    },
    setLogoutSuccess: (state) => {
      state.currentUser = null;
      state.error = null;
    },
  },
});

// Async Thunk Action Creator for login
export const loginUser =
  (email: string, password: string) => async (dispatch: AppDispatch) => {
    try {
      const userCredentials = await auth.signInWithEmailAndPassword(
        email,
        password
      );
      dispatch(setCurrentUser(userCredentials));
    } catch (error) {
      dispatch(setLoginError(error.message));
    }
  };

// Async Thunk Action Creator for logout
export const logoutUser = () => async (dispatch: AppDispatch) => {
  try {
    await auth.signOut();
    dispatch(setLogoutSuccess());
  } catch (error) {
    console.error('Error while logging out', error);
  }
};

// Selector to get current user
export const selectCurrentUser = (state: RootState) => state.user.currentUser;

// Selector to get login error message
export const selectLoginError = (state: RootState) => state.user.error;

// Export action creators and reducer
export const { setCurrentUser, setLoginError, setLogoutSuccess } =
  userSlice.actions;
export default userSlice.reducer;

// import {
//   createAsyncThunk,
//   createEntityAdapter,
//   createSelector,
//   createSlice,
//   EntityState,
//   PayloadAction,
// } from '@reduxjs/toolkit';
// import { User as FirebaseUser } from 'firebase/auth';

// export const USER_FEATURE_KEY = 'user';

// /*
//  * Update these interfaces according to your requirements.
//  */
// export interface UserEntity {
//   user: FirebaseUser | null;
// }

// export interface UserState extends EntityState<UserEntity> {
//   loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
//   error: string | null | undefined;
// }

// export const userAdapter = createEntityAdapter<UserEntity>();

// /**
//  * Export an effect using createAsyncThunk from
//  * the Redux Toolkit: https://redux-toolkit.js.org/api/createAsyncThunk
//  *
//  * e.g.
//  * ```
//  * import React, { useEffect } from 'react';
//  * import { useDispatch } from 'react-redux';
//  *
//  * // ...
//  *
//  * const dispatch = useDispatch();
//  * useEffect(() => {
//  *   dispatch(fetchUser())
//  * }, [dispatch]);
//  * ```
//  */
// export const fetchUser = createAsyncThunk(
//   'user/fetchStatus',
//   async (_, thunkAPI) => {
//     /**
//      * Replace this with your custom fetch call.
//      * For example, `return myApi.getUsers()`;
//      * Right now we just return an empty array.
//      */
//     return Promise.resolve([]);
//   }
// );

// export const initialUserState: UserState = userAdapter.getInitialState({
//   loadingStatus: 'not loaded',
//   error: null,
// });

// export const userSlice = createSlice({
//   name: USER_FEATURE_KEY,
//   initialState: initialUserState,
//   reducers: {
//     add: userAdapter.addOne,
//     remove: userAdapter.removeOne,
//     // ...
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchUser.pending, (state: UserState) => {
//         state.loadingStatus = 'loading';
//       })
//       .addCase(
//         fetchUser.fulfilled,
//         (state: UserState, action: PayloadAction<UserEntity[]>) => {
//           userAdapter.setAll(state, action.payload);
//           state.loadingStatus = 'loaded';
//         }
//       )
//       .addCase(fetchUser.rejected, (state: UserState, action) => {
//         state.loadingStatus = 'error';
//         state.error = action.error.message;
//       });
//   },
// });

// /*
//  * Export reducer for store configuration.
//  */
// export const userReducer = userSlice.reducer;

// /*
//  * Export action creators to be dispatched. For use with the `useDispatch` hook.
//  *
//  * e.g.
//  * ```
//  * import React, { useEffect } from 'react';
//  * import { useDispatch } from 'react-redux';
//  *
//  * // ...
//  *
//  * const dispatch = useDispatch();
//  * useEffect(() => {
//  *   dispatch(userActions.add({ id: 1 }))
//  * }, [dispatch]);
//  * ```
//  *
//  * See: https://react-redux.js.org/next/api/hooks#usedispatch
//  */
// export const userActions = userSlice.actions;

// /*
//  * Export selectors to query state. For use with the `useSelector` hook.
//  *
//  * e.g.
//  * ```
//  * import { useSelector } from 'react-redux';
//  *
//  * // ...
//  *
//  * const entities = useSelector(selectAllUser);
//  * ```
//  *
//  * See: https://react-redux.js.org/next/api/hooks#useselector
//  */
// const { selectAll, selectEntities } = userAdapter.getSelectors();

// export const getUserState = (rootState: unknown): UserState =>
//   rootState[USER_FEATURE_KEY];

// export const selectAllUser = createSelector(getUserState, selectAll);

// export const selectUserEntities = createSelector(getUserState, selectEntities);
