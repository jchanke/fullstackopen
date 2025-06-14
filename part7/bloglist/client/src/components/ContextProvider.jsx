import { UserContextProvider } from "../contexts/UserContext";
import { NotificationContextProvider } from "../contexts/NotificationContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

const ContextProvider = (prop) => {
  return (
    <QueryClientProvider client={queryClient}>
      <NotificationContextProvider>
        <UserContextProvider>{prop.children}</UserContextProvider>
      </NotificationContextProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default ContextProvider;
