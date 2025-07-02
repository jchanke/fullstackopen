import { useNotification } from "../contexts/NotificationContext";

const Notification = () => {
  const { notification } = useNotification()!;
  if (!notification) return;

  const style = { padding: 5, color: notification.isError ? "red" : "green" };

  return <div style={style}>{notification.message}</div>;
};

export default Notification;
