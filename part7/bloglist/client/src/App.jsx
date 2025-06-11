import { useState, useEffect, useRef } from "react";

import Blog from "./components/Blog";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";

import blogService from "./services/blogs";
import loginService from "./services/login";

const USER = "loggedInUser";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);

  const fetchBlogs = async () => {
    const blogs = await blogService.getAll();
    setBlogs(blogs);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem(USER);
    if (loggedInUserJSON !== null) {
      const user = JSON.parse(loggedInUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const displayInfo = (message) => {
    setNotification({ message, isError: false });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const displayError = (message) => {
    setNotification({ message, isError: true });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const tryLoginUser = async ({ username, password }) => {
    try {
      const user = await loginService.loginUser({ username, password });
      setNotification(null);
      window.localStorage.setItem(USER, JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      return true;
    } catch (error) {
      displayError("wrong username or password");
      console.error("invalid username or password:", error.message);
      return false;
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem(USER);
    setUser(null);
  };

  const tryCreateBlog = async ({ title, author, url }) => {
    try {
      await blogService.create({ title, author, url });
      blogFormRef.current.toggleVisibility();
      displayInfo(`a new blog ${title} by ${author} added`);
      await fetchBlogs();
      return true;
    } catch (error) {
      displayError("unable to create blog");
      console.error("unable to create blog:", error.message);
      return false;
    }
  };

  const incrLikes = async (blog) => {
    const blogWithMoreLikes = {
      ...blog,
      likes: blog.likes + 1,
    };
    await blogService.updateBlog(blog.id, blogWithMoreLikes);
    setBlogs(blogs.map((b) => (b.id === blog.id ? blogWithMoreLikes : b)));
  };

  const tryDeleteBlog = async (blog) => {
    if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      return;
    }

    try {
      await blogService.deleteBlog(blog.id);
    } catch (error) {
      const response = error.response;
      if (response.status === 401) {
        displayError(`unable to delete blog created by ${blog.user.name}`);
        return;
      }
    }
    setBlogs(blogs.filter((b) => b.id !== blog.id));
  };

  const blogFormRef = useRef();

  if (!user) {
    return (
      <div>
        <h2>log in to application</h2>
        {notification && (
          <Notification
            message={notification.message}
            isError={notification.isError}
          />
        )}
        <LoginForm tryLoginUser={tryLoginUser} />
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      {notification && (
        <Notification
          message={notification.message}
          isError={notification.isError}
        />
      )}
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>

      <Togglable buttonLabel="new note" ref={blogFormRef}>
        <BlogForm tryCreateBlog={tryCreateBlog} />
      </Togglable>
      {blogs
        .sort((blog0, blog1) => blog1.likes - blog0.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            incrLikes={incrLikes}
            canDeleteBlog={user.username === blog.user.username}
            tryDeleteBlog={tryDeleteBlog}
          />
        ))}
    </div>
  );
};

export default App;
