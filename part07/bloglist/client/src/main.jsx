import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "./components/ui/provider";

import App from "./App";
import "./index.css";

import ContextProvider from "./components/ContextProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ContextProvider>
      <Router>
        <Provider>
          <App />
        </Provider>
      </Router>
    </ContextProvider>
  </StrictMode>
);
