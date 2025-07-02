import { createContext, useContext, useReducer } from "react";
import PropTypes from "prop-types";

const NotificationContext = createContext();

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "info":
      return { message: action.payload, isError: false };
    case "error":
      return { message: action.payload, isError: true };
    case "clear":
      return null;
    default:
      return state;
  }
};

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    null
  );

  const clear = () => {
    notificationDispatch({ type: "clear" });
  };

  const info = (message, timeInMilliseconds = 5000) => {
    notificationDispatch({ type: "info", payload: message });
    setTimeout(() => {
      clear();
    }, timeInMilliseconds);
  };

  const error = (message, timeInMilliseconds = 5000) => {
    notificationDispatch({ type: "error", payload: message });
    setTimeout(() => {
      clear();
    }, timeInMilliseconds);
  };

  return (
    <NotificationContext.Provider value={{ notification, clear, info, error }}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);

NotificationContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default NotificationContext;
