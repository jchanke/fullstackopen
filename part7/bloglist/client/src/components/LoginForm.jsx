import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../contexts/NotificationContext";
import { useCurrentUser } from "../contexts/UserContext";
import loginService from "../services/login";

import { Button, Field, Input, Stack } from "@chakra-ui/react";
import { PasswordInput } from "./ui/password-input";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const notification = useNotification();
  const { setUser } = useCurrentUser();
  const navigate = useNavigate();

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
    navigate("/");
  };

  return (
    <form onSubmit={handleLoginSubmit}>
      <Stack gap="4" align="flex-start" maxWidth="sm">
        <Field.Root>
          <Field.Label>username</Field.Label>
          <Input
            name="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </Field.Root>

        <Field.Root>
          <Field.Label>password</Field.Label>
          <PasswordInput
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </Field.Root>

        <Button type="submit">login</Button>
      </Stack>
    </form>
  );
};

export default LoginForm;
