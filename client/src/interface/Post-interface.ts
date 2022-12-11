export interface IPost {
   allUser: any;
   post: {
      likes: {
         count: number;
         users: Array<string>;
      };
      comments: {
         count: number;
         comment: {
            comments: Array<object>;
         };
      };
      _id: string;
      text: string;
      owner: string;
      image?: string;
      createdAt: string;
   };
   index: number;
   user: {
      _id: string;
      name: string;
      email: string;
      avatar: string | null;
      admin: boolean;
      token: string;
   };
}

export interface IComments {
   name: string;
   avatar: string;
   createdAt: string;
   text: string;
}