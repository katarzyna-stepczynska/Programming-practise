import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:5000" });

api.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const fetchPosts = (page) => api.get(`/posts?page=${page}`);
export const fetchPostsBySearch = (searchQuery) =>
  api.get(
    `/posts/search?searchQuery=${searchQuery.searchByTitle || "none"}&tags=${
      searchQuery.tags
    }`
  );
export const createPost = (newPost) => api.post("/posts", newPost);
export const updatePost = (id, updatedPost) =>
  api.patch(`${"/posts"}/${id}`, updatedPost);
export const deletePost = (id) => api.delete(`${"/posts"}/${id}`);
export const likePost = (id) => api.patch(`${"/posts"}/${id}/likePost`);

export const signIn = (formData) => api.post("/user/signin", formData);
export const signUp = (formData) => api.post("/user/signup", formData);
