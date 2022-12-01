import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface userState {
   user: any;
   allUser: any;
}

const initialState: userState = {
   user: null,
   allUser: null,
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
      userLogout: (state) => {
         state.user = false;
         localStorage.removeItem("token");
      },
   },
});

export const { userLogin, userLogout, allUserFunc } = userReducer.actions;

export default userReducer.reducer;
