import { useMutation } from "@apollo/client";
import { useUser } from "../contexts/UserContext";
import { useNotification } from "../contexts/NotificationContext";
import { useField } from "../hooks";
import { LOGIN, USER_TOKEN } from "../queries";

const LoginForm = () => {
  const user = useUser();
  const notification = useNotification();

  const username = useField({ name: "username" });
  const password = useField({ name: "password", type: "password" });
  const [login] = useMutation(LOGIN);

  if (user.query.loading) return "loading user...";
  if (user.query.error) return JSON.stringify(user.query.error);

  const onLogin = async (event) => {
    event.preventDefault();
    try {
      const result = await login({
        variables: {
          username: username.value,
          password: password.value,
        },
      });
      const token = result.data.login.value;
      window.localStorage.setItem(USER_TOKEN, token);
    } catch (error) {
      console.error(error);
      notification.error(error.message);
      return;
    }
    username.setValue("");
    password.setValue("");
    await user.query.refetch();
  };

  return (
    <>
      <h2>log in</h2>
      <form onSubmit={onLogin}>
        {username.input}
        {password.input}
        <button type="submit">log in</button>
      </form>
    </>
  );
};

export default LoginForm;
