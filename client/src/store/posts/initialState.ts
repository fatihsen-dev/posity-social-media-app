import { Posts, UpdatePost } from "../../interface";

export interface userState {
   posts: Array<Posts>;
   postUpdate: UpdatePost;
}

export const initialState: userState = {
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
