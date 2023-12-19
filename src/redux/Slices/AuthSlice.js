import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // local storage se token dhundo
  signupData: null,
  loading: false,
  token: localStorage?.getItem("token")
    ? JSON?.parse(localStorage.getItem("token"))
    : null,
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setToken(state, value) {
      state.token = value.payload;
    },
    setLoading(state, value) {
      state.loading = value.payload;
    },
    setSignupData(state, value) {
      state.signupData = value.payload;
    },
  },
});

export const { setToken, setLoading, setSignupData } = AuthSlice.actions;
export default AuthSlice.reducer;
