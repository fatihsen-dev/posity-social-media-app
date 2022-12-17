import { initialState } from "./initialState";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { UpdatePost } from "../../interface";

export const userReducer = createSlice({
   name: "postReducer",
   initialState,
   reducers: {
      setAllpost: (state, action: PayloadAction<any>) => {
         state.posts = action.payload;
      },
      setUpdatePost: (state, action: PayloadAction<UpdatePost>) => {
         state.postUpdate = action.payload;
      },
   },
});

export const { setAllpost, setUpdatePost } = userReducer.actions;
export default userReducer.reducer;
