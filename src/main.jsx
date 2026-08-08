import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import ErrorBoundary from "./components/common/ErrorBoundary";
import { WatchlistProvider } from "./context/WatchlistContext";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <WatchlistProvider>
          <App />
        </WatchlistProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
);
