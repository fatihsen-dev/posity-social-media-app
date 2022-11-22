import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface userState {
   user: any;
   allUser: any;
   userProfileData: any;
}

const initialState: userState = {
   user: null,
   allUser: null,
   userProfileData: null,
};

export const userReducer = createSlice({
   name: "userReducer",
   initialState,
   reducers: {
      userLogin: (state, action: PayloadAction<any>) => {
         state.user = action.payload;
         localStorage.setItem("token", state.user.token);
      },
      allUserFunc: (state, action: PayloadAction<any>) => {
         state.allUser = action.payload;
      },
      userProfileDataFunc: (state, action: PayloadAction<any>) => {
         state.userProfileData = action.payload;
      },
      userLogout: (state) => {
         state.user = false;
         localStorage.removeItem("token");
      },
   },
});

export const { userLogin, userLogout, allUserFunc, userProfileDataFunc } =
   userReducer.actions;

export default userReducer.reducer;
