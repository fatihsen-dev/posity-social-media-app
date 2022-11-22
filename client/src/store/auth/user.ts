import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface userState {
   user: any;
}

const initialState: userState = {
   user: null,
};

export const userReducer = createSlice({
   name: "userReducer",
   initialState,
   reducers: {
      userLogin: (state, action: PayloadAction<any>) => {
         state.user = action.payload;
         localStorage.setItem("token", state.user.token);
      },
      userLogout: (state) => {
         state.user = false;
         localStorage.removeItem("token");
      },
   },
});

export const { userLogin, userLogout } = userReducer.actions;

export default userReducer.reducer;
