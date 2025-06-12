import { useState } from "react";
import { useDispatch } from "react-redux";

import { tryLoginUser } from "../reducers/userReducer";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    dispatch(tryLoginUser({ username, password }));
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
