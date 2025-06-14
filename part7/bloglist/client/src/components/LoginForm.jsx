import { useState } from "react";
import { useNotification } from "../contexts/NotificationContext";
import { useCurrentUser } from "../contexts/UserContext";

import loginService from "../services/login";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const notification = useNotification();
  const { setUser } = useCurrentUser();

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.loginUser({ username, password });
      setUser(user);
    } catch (error) {
      notification.error("wrong username or password");
      console.error(`invalid username or password: ${error.message}`);
      return;
    }
    notification.clear();
    setUsername("");
    setPassword("");
  };

  return (
    <form onSubmit={handleLoginSubmit}>
      <label htmlFor="username">username</label>
      <input
        name="username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
      <br />
      <label htmlFor="password">password</label>
      <input
        name="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <br />
      <button type="submit">login</button>
    </form>
  );
};

export default LoginForm;
