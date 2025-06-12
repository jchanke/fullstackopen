import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import BlogList from "./components/BlogList";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";

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

      <Togglable buttonLabel="new note">
        {(props) => <BlogForm {...props} />}
      </Togglable>
      <BlogList />
    </div>
  );
};

export default App;
