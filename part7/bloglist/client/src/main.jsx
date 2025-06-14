import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import "./index.css";

import ContextProvider from "./components/ContextProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ContextProvider>
      <Router>
        <App />
      </Router>
    </ContextProvider>
  </StrictMode>
);
