import { createSlice } from "@reduxjs/toolkit";

import { clearNotification, displayError } from "./notificationReducer";

import blogService from "../services/blogs";
import loginService from "../services/login";

export const USER = "loggedInUser";

const userReducer = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    clearUser(state, action) {
      return null;
    },
    setUser(state, action) {
      const user = action.payload;
      return user;
    },
  },
});

export const tryLoginUser = ({ username, password }) => {
  return async (dispatch) => {
    try {
      dispatch(clearNotification());
      const user = await loginService.loginUser({ username, password });
      window.localStorage.setItem(USER, JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(setUser(user));
      return true;
    } catch (error) {
      dispatch(displayError("wrong username or password"));
      console.error("invalid username or password:", error.message);
      return false;
    }
  };
};

export const getUserTokenIfExists = () => {
  return async (dispatch) => {
    const loggedInUserJSON = window.localStorage.getItem(USER);
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  };
};

export default userReducer.reducer;
export const { setUser, clearUser } = userReducer.actions;
