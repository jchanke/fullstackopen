import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App.tsx";
import DiagnosisContextProvider from "./contexts/DiagnosesContext.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <DiagnosisContextProvider>
        <App />
      </DiagnosisContextProvider>
    </QueryClientProvider>
  </StrictMode>
);
