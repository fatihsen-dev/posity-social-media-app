import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface userState {
   user: any;
}

const initialState: userState = {
   user: false,
};

export const userReducer = createSlice({
   name: "userReducer",
   initialState,
   reducers: {
      userLogin: (state, action: PayloadAction<object>) => {
         state.user = action.payload;
         localStorage.setItem("loginToken", JSON.stringify(state.user.token));
      },
      userControl: (state) => {
         console.log(state.user);
      },
      userLogout: (state) => {
         state.user = false;
      },
   },
});

export const { userLogin, userLogout, userControl } = userReducer.actions;

export default userReducer.reducer;
