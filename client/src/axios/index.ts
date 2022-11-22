import axios from "axios";

const HTTP = axios.create({
   baseURL: process.env.REACT_APP_API_URL,
});

export const login = async (formData: object) =>
   await HTTP.post("/users/login", formData);

export const Control = async (token: object) =>
   await HTTP.post("/users/usercontrol", token);

export const register = async (formData: object) =>
   await HTTP.post("/users/register", formData);

export const getAllPost = async () => await HTTP.post("/posts");
