import userReducer from "./auth/user";
import postsReducer from "./posts/post";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
   reducer: {
      userData: userReducer,
      postsData: postsReducer,
   },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
