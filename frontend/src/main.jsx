import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./style/index.css";
import { BrowserRouter } from "react-router";
import { AuthProvider } from "./contexts/AuthContext";
import { SocketContextProvider } from "./contexts/SocketContext";
import App from "./App.jsx";
import ToastMessage from "./components/ui/ToastMessage.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <SocketContextProvider>
        <StrictMode>
          <ToastMessage />
          <App />
        </StrictMode>
      </SocketContextProvider>
    </AuthProvider>
  </BrowserRouter>
);
