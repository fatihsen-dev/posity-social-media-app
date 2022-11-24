import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface userState {
   posts: any;
}

const initialState: userState = {
   posts: null,
};

export const userReducer = createSlice({
   name: "postReducer",
   initialState,
   reducers: {
      setAllpost: (state, action: PayloadAction<any>) => {
         state.posts = action.payload;
      },
   },
});

export const { setAllpost } = userReducer.actions;

export default userReducer.reducer;
