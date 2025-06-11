import PropTypes from "prop-types";

const Notification = ({ message, isError }) => {
  if (message === null) {
    return null;
  }
  const notificationStyle = {
    color: isError ? "red" : "green",
  };
  return (
    <div className="notification" style={notificationStyle}>
      {message}
    </div>
  );
};

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  isError: PropTypes.bool.isRequired,
};

export default Notification;
