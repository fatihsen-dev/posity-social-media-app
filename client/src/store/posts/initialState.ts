import { Posts, UpdatePost } from "../../interface";

export interface userState {
   posts: Array<Posts>;
   postUpdate: UpdatePost;
   profileData: any;
}

export const initialState: userState = {
   posts: [],
   profileData: "",
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
