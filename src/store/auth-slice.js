import { createSlice } from "@reduxjs/toolkit";

const initialToken = localStorage.getItem("token") || null;
const authInitialState = {
  token: initialToken,
  isLoggedIn: !!initialToken,
  authLoading: false,
  logoutTime: !!initialToken,
};

const Auth = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
      state.isLoggedIn = !!action.payload.token;
      state.logoutTime = action.payload.timer;
      localStorage.setItem("token", action.payload.token);
      // console.log(state.isLoggedIn);
    },
    logout(state) {
      state.token = null;
      state.isLoggedIn = false;
      localStorage.removeItem("token");
      localStorage.removeItem("expirationTime");
      if (state.logoutTime) {
        clearTimeout(state.logoutTime);
      }
      state.logoutTime = null;
    },
    loading(state, action) {
      state.authLoading = action.payload;
    },
  },
});

export const AuthActions = Auth.actions;
export default Auth.reducer;
