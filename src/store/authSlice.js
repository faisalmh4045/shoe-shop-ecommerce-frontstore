import { createSlice } from "@reduxjs/toolkit";
import authService from "@/lib/supabase/auth";

const initialState = {
  session: null,
  user: null,
  loading: true,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSession(state, action) {
      const session = action.payload ?? null;
      state.session = session;
      state.user = session?.user ?? null;
      state.isAuthenticated = Boolean(state.user);
    },
    setLoading(state, action) {
      state.loading = Boolean(action.payload);
    },
    clearSession(state) {
      state.session = null;
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setSession, setLoading, clearSession } = authSlice.actions;

export const selectUser = (state) => state.auth.user;
export const selectSession = (state) => state.auth.session;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthLoading = (state) => state.auth.loading;

export default authSlice.reducer;

// async thunks that perform auth operations
export const signUp = (fullName, email, password) => async (dispatch) => {
  const { data, error } = await authService.signUp(fullName, email, password);
  if (error) throw error;
  if (data?.session) dispatch(setSession(data.session));
  return true;
};

export const signIn = (email, password) => async (dispatch) => {
  const { data, error } = await authService.signIn(email, password);
  if (error) throw error;
  if (data?.session) dispatch(setSession(data.session));
  return true;
};

export const signOut = () => async (dispatch) => {
  const { error } = await authService.signOut();
  if (error) throw error;
  dispatch(clearSession());
  return true;
};

export const updatePassword = (password) => async () => {
  const { error } = await authService.updatePassword(password);
  if (error) throw error;
  return true;
};

export const sendResetPasswordEmail = (email) => async () => {
  const { error } = await authService.resetPasswordForEmail(email);
  if (error) throw error;
  return true;
};
