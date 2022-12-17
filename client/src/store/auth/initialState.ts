import { User, AllUser } from "../../interface";

export interface userState {
   status: null | false | true;
   user: User;
   allUser: Array<AllUser>;
}

export const initialState: userState = {
   status: null,
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
