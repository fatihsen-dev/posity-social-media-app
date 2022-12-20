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
      setUpdateData: (state, action: PayloadAction<UpdatePost>) => {
         state.postUpdate = action.payload;
      },
      setShareData: (state, action: PayloadAction<UpdatePost>) => {
         state.postUpdate = action.payload;
      },
      setProfileData: (state, action: PayloadAction<UpdatePost>) => {
         state.profileData = action.payload;
      },
   },
});

export const { setAllpost, setUpdateData, setProfileData } = userReducer.actions;
export default userReducer.reducer;
