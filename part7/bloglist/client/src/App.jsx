import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import BlogList from "./components/BlogList";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";

import { displayInfo, displayError } from "./reducers/notificationReducer";
import { createBlog } from "./reducers/blogsReducer";
import { clearUser, getUserTokenIfExists, USER } from "./reducers/userReducer";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(({ user }) => user);

  useEffect(() => {
    dispatch(getUserTokenIfExists());
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem(USER);
    dispatch(clearUser());
  };

  const tryCreateBlog = async ({ title, author, url }) => {
    try {
      await dispatch(createBlog({ title, author, url }));
      dispatch(displayInfo(`a new blog ${title} by ${author} added`));
      blogFormRef.current.toggleVisibility();
      return true;
    } catch (error) {
      dispatch(displayError("unable to create blog"));
      console.error("unable to create blog:", error.message);
      return false;
    }
  };

  const blogFormRef = useRef();

  if (!user) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification />
        <LoginForm />
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>

      <Togglable buttonLabel="new note" ref={blogFormRef}>
        <BlogForm tryCreateBlog={tryCreateBlog} />
      </Togglable>
      <BlogList />
    </div>
  );
};

export default App;
