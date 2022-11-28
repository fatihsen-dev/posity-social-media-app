import axios from "axios";
const HTTP = axios.create({
   baseURL: process.env.REACT_APP_API_URL,
});

// user login
export const login = async (formData: object) =>
   await HTTP.post("/users/login", formData);

// user login control
export const Control = async (token: object) =>
   await HTTP.post("/users/usercontrol", token);

// user register
export const register = async (formData: object) =>
   await HTTP.post("/users/register", formData);

// get users
export const getAllUsers = async () => await HTTP.get("/users");

// get profile page data
export const getProfileUser = async (userid: any) =>
   await HTTP.get(`/users/getoneuser/${userid}`);

// New post
export const newPost = async (formData: object) =>
   await HTTP.post("/posts/create", formData);

// like post
export const likePost = async (formData: object) =>
   await HTTP.post("/posts/like", formData);

// get posts
export const getAllPost = async () => await HTTP.get("/posts");

// like post
export const sendComment = async (formData: object) =>
   await HTTP.post("/posts/comment/create", formData);
