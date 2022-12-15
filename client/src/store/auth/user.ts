import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { User, AllUser } from "../../interface";

export interface userState {
   user: User;
   allUser: Array<AllUser>;
}

const initialState: userState = {
   user: {
      _id: "",
      name: "",
      email: "",
      avatar: "",
      admin: false,
      token: "",
   },
   allUser: [
      {
         _id: "",
         name: "",
         avatar: "",
      },
   ],
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
