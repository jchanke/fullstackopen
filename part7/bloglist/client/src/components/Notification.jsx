import { useNotification } from "../contexts/NotificationContext";
import { Alert } from "./ui/alert";

const Notification = () => {
  const { notification } = useNotification();
  const status = notification?.isError ? "error" : "success";

  return (
    notification && (
      <>
        <Alert title={notification.message} status={status} />
        <br />
      </>
    )
  );
};

export default Notification;
