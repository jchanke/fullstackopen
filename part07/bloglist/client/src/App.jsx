import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Blog from "./components/Blog.jsx";
import Home from "./components/Home";
import LoginForm from "./components/LoginForm";
import NavBar from "./components/NavBar.jsx";
import Notification from "./components/Notification";
import User from "./components/User.jsx";
import Users from "./components/Users";

import { useCurrentUser, USER } from "./contexts/UserContext";
import { Heading, Stack } from "@chakra-ui/react";

const App = () => {
  const { user, setUser } = useCurrentUser();

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem(USER);
    if (loggedInUserJSON !== null) {
      const user = JSON.parse(loggedInUserJSON);
      setUser(user);
    }
  }, []);

  if (!user) {
    return (
      <Stack>
        <NavBar />
        <h2>log in to application</h2>
        <Notification />
        <LoginForm />
      </Stack>
    );
  }

  return (
    <Stack>
      <NavBar />
      <Heading>blog app</Heading>
      <Notification />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/blogs/:id" element={<Blog />} />
      </Routes>
    </Stack>
  );
};

export default App;
