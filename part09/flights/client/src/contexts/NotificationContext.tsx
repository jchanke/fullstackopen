import { createContext, useContext, useState, type ReactNode } from "react";

interface NotificationContext {
  info: (message: string) => void;
  error: (message: string) => void;
  clear: () => void;
  notification: Notification | null;
}

interface Notification {
  message: string;
  isError: boolean;
}

interface NotificationContextProviderProps {
  children: ReactNode;
}

const NotificationContext = createContext<NotificationContext | undefined>(
  undefined
);

export const NotificationContextProvider = (
  props: NotificationContextProviderProps
) => {
  const [notification, setNotification] = useState<Notification | null>(null);

  const clear = () => setNotification(null);

  const info = (message: string) => {
    setNotification({ message, isError: false });
    setTimeout(clear, 5000);
  };

  const error = (message: string) => {
    setNotification({ message, isError: true });
    setTimeout(clear, 5000);
  };

  return (
    <NotificationContext.Provider value={{ info, error, clear, notification }}>
      {props.children}
    </NotificationContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useNotification = () => useContext(NotificationContext);

export default NotificationContext;
