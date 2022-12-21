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
      share: {
         count: number;
         users: Array<string>;
      };
      shared: any;
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

export interface Posts {
   likes: {
      count: number;
      users: Array<string>;
   };
   comments: {
      count: number;
      comment: {
         comments: [
            {
               user: string;
               text: string;
               _id: string;
               createdAt: string;
            }
         ];
         __v: number;
      } | null;
   };
   share?: any;
   _id: string;
   shared: string;
   text: string;
   owner: string;
   createdAt: string;
}

export interface UpdatePost {
   status: boolean;
   user: {
      id: string;
      token: string;
      avatar: string | null;
      name: string;
   };
   post: {
      text: string;
      image: string | null;
      id: string;
      date: string;
   };
}
