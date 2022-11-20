import axios from "axios";

const HTTP = axios.create({
   baseURL: process.env.REACT_APP_API_URL,
});

export const login = async (formData: object) =>
   await HTTP.post("/users/login", formData);

export const register = async (formData: object) =>
   await HTTP.post("/users/register", formData);

//export const test = async (id) => await HTTP.get(`/blogs/user-blogs/${id}`);
