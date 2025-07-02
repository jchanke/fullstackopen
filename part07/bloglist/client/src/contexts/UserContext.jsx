import { createContext, useContext, useReducer } from "react";
import PropTypes from "prop-types";
import blogService from "../services/blogs";

export const USER = "loggedInUser";

const UserContext = createContext();

const userReducer = (state, action) => {
  switch (action.type) {
    case "set":
      return action.payload;
    case "clear":
      return null;
    default:
      console.error(action.type);
      return state;
  }
};

export const UserContextProvider = (props) => {
  const [user, userDispatch] = useReducer(userReducer, null);

  const setUser = (user) => {
    userDispatch({ type: "set", payload: user });
    blogService.setToken(user?.token);
    window.localStorage.setItem(USER, JSON.stringify(user));
  };

  const clearUser = () => {
    userDispatch({ type: "clear", payload: user });
    blogService.setToken(null);
    window.localStorage.removeItem(USER);
  };

  return (
    <UserContext.Provider value={{ user, setUser, clearUser }}>
      {props.children}
    </UserContext.Provider>
  );
};

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useCurrentUser = () => {
  return useContext(UserContext);
};

export default UserContext;
