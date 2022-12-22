import { Posts, AllUser } from "../interface";

export const FindPost = (posts: Array<Posts>, id: string) => {
   return posts.find((post: Posts) => post._id === id);
};

export const FindUser = (allUser: Array<AllUser>, id: string) => {
   return allUser.find((user: AllUser) => user._id === id);
};
