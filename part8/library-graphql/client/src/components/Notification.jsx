import { useNotification } from "../contexts/NotificationContext";

const Notification = () => {
  const { notification } = useNotification();
  const notificationStyle = { color: notification?.isError ? "red" : "green" };

  if (!notification) {
    return;
  }

  return <div style={notificationStyle}>{notification.message}</div>;
};

export default Notification;
