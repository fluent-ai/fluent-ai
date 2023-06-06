import { Session } from '@supabase/supabase-js';
import { supabase } from '@tool-ai/supabase';
import {
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';

export const SUPABASE_FEATURE_KEY = 'supabase';

export interface SupabaseEntity {
  id: number;
}
export interface SupabaseState extends EntityState<SupabaseEntity> {
  session: Session | null;
}

export const supabaseAdapter = createEntityAdapter<SupabaseEntity>();

export const initialSupabaseState: SupabaseState =
  supabaseAdapter.getInitialState({
    session: null,
  });

export const supabaseSlice = createSlice({
  name: SUPABASE_FEATURE_KEY,
  initialState: initialSupabaseState,
  reducers: {
    setSession: (state, action: PayloadAction<Session | null>) => {
      if (action.payload) {
        state.session = action.payload;
      }
    },
    logout: (state) => {
      supabase.signOut();
    },
  },
});

export const supabaseReducer = supabaseSlice.reducer;
export const supabaseActions = supabaseSlice.actions;
export const getSupabaseState = (rootState: any): SupabaseState =>
  rootState[SUPABASE_FEATURE_KEY];

const getSession = createSelector(getSupabaseState, (state) => state.session);
const getUserId = createSelector(getSession, (session) => session?.user?.id);

export const supabaseSelectors = {
  getSession,
  getUserId,
};
