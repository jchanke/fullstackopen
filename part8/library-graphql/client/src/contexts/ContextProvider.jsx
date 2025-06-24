import PropTypes from "prop-types";
import { NotificationContextProvider } from "./NotificationContext";
import { UserContextProvider } from "./UserContext";

const ContextProvider = (props) => {
  return (
    <UserContextProvider>
      <NotificationContextProvider>
        {props.children}
      </NotificationContextProvider>
    </UserContextProvider>
  );
};

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContextProvider;
