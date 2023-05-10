import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './lib/user.slice';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
//  */  // Path: libs/redux/src/lib/user.slice.ts
// import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
// import { UserEntity } from '@myorg/data';
// import { createAsyncThunk } from '@reduxjs/toolkit';
// import { userAdapter, UserState, USER_FEATURE_KEY } from './user.reducer';

//
// export const userActions = userSlice.actions;
// export const userReducer = userSlice.reducer;
// export const selectAllUser = userAdapter.getSelectors().selectAll;
// export const selectUserEntities = userAdapter.getSelectors().selectEntities;
// export const getUserState = (rootState: unknown): UserState =>
//   rootState[USER_FEATURE_KEY];
// export const selectAllUser = createSelector(getUserState, selectAll);
// export const selectUserEntities = createSelector(getUserState, selectEntities);
