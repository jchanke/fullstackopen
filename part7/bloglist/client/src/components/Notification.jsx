import { useNotification } from "../contexts/NotificationContext";

const Notification = () => {
  const { notification } = useNotification();

  if (!notification) {
    return null;
  }

  const notificationStyle = { color: notification.isError ? "red" : "green" };
  return (
    <div className="notification" style={notificationStyle}>
      {notification.message}
    </div>
  );
};

export default Notification;
