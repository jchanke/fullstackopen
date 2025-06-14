import { useEffect } from "react";

import BlogList from "./components/BlogList";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";

import { useUser, USER } from "./contexts/UserContext";

const App = () => {
  const { user, setUser, clearUser } = useUser();

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem(USER);
    if (loggedInUserJSON !== null) {
      const user = JSON.parse(loggedInUserJSON);
      setUser(user);
    }
  }, []);

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
        <button onClick={clearUser}>logout</button>
      </p>
      <Togglable buttonLabel="new note">
        {(props) => <BlogForm {...props} />}
      </Togglable>
      <BlogList />
    </div>
  );
};

export default App;
