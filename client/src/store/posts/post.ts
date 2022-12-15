import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Posts } from "../../interface";

interface UpdatePost {
   status: boolean;
   user: {
      id: string;
      token: string;
      avatar: string | null;
      name: string;
   };
   post: {
      text: string;
      image: string | null;
      id: string;
      date: string;
   };
}

export interface userState {
   posts: Array<Posts>;
   postUpdate: UpdatePost;
}

const initialState: userState = {
   posts: [],
   postUpdate: {
      status: false,
      user: {
         id: "",
         name: "",
         avatar: "",
         token: "",
      },
      post: {
         text: "",
         image: "",
         id: "",
         date: "",
      },
   },
};

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
