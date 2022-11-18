import axios from "axios";

const HTTP = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const login = async (formData) =>
  await HTTP.post("/users/login", formData);

export const register = async (id) => await HTTP.get(`/blogs/user-blogs/${id}`);
