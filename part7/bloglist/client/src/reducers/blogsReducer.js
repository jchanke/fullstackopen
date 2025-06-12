import { createSlice } from "@reduxjs/toolkit";

import blogService from "../services/blogs";

const blogsReducer = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      const blogs = action.payload;
      return blogs;
    },
    addBlog(state, action) {
      const blog = action.payload;
      return [...state, blog];
    },
    updateBlog(state, action) {
      const newBlog = action.payload;
      return state.map((blog) => (blog.id === newBlog.id ? newBlog : blog));
    },
    removeBlogById(state, action) {
      const id = action.payload;
      return state.filter((blog) => blog.id !== id);
    },
  },
});

export const fetchBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = ({ title, author, url }) => {
  return async (dispatch) => {
    const newBlog = await blogService.create({ title, author, url });
    dispatch(addBlog(newBlog));
  };
};

export const deleteBlogById = (id) => {
  return async (dispatch) => {
    await blogService.deleteBlog(id);
    dispatch(removeBlogById(id));
  };
};

export const voteFor = (blog) => {
  return async (dispatch) => {
    const newBlog = { ...blog, likes: blog.likes + 1 };
    await blogService.updateBlog(blog.id, newBlog);
    dispatch(updateBlog(newBlog));
  };
};

export const { addBlog, setBlogs, removeBlogById, updateBlog } =
  blogsReducer.actions;
export default blogsReducer.reducer;
