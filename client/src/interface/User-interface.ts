export interface User {
   _id: string;
   name: string;
   email: string;
   avatar: null | string;
   admin: boolean;
   token: string;
}

export interface AllUser {
   _id: string;
   name: string;
   avatar: null | string;
}
