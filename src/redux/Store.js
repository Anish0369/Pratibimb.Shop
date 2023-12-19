import { configureStore } from "@reduxjs/toolkit";
import { CartSlice } from "./Slices/CartSlice";
import { AuthSlice } from "./Slices/AuthSlice";
import { ProfileSlice } from "./Slices/ProfileSlice";

export const store = configureStore({
  reducer: {
    cart: CartSlice.reducer,
    auth: AuthSlice.reducer,
    // profile: ProfileSlice.reducer,
    // profile: ProfileSlice.reducer,
  },
});
