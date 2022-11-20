import userReducer from "./auth/user";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
   reducer: {
      userData: userReducer,
   },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
