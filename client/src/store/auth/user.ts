import { initialState } from "./initialState";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export const userReducer = createSlice({
   name: "userReducer",
   initialState,
   reducers: {
      userLogin: (state, action: PayloadAction<any>) => {
         state.user = action.payload.user;
         state.status = action.payload.status;
         localStorage.setItem("token", state.user.token);
      },
      allUserFunc: (state, action: PayloadAction<any>) => {
         state.allUser = action.payload;
      },
      userLogout: (state) => {
         state.status = false;
         state.user = {
            _id: "",
            name: "",
            email: "",
            avatar: "",
            admin: false,
            token: "",
         };
         localStorage.removeItem("token");
      },
   },
});

export const { userLogin, userLogout, allUserFunc } = userReducer.actions;
export default userReducer.reducer;
