import React, { createContext, useEffect, useState, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";
import { useNavigate } from "react-router";

const { MODE, VITE_SOCKET_URL } = import.meta.env;
const SOCKET_URL =
  MODE === "development" ? "http://localhost:4000/" : VITE_SOCKET_URL;

export const SocketContext = createContext();

const SocketContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [socket, setSocket] = useState(null);
  const [sessionData, setSessionData] = useState(null);
  const [sessionActive, setSessionActive] = useState(false);
  const { user } = useAuthContext();

  useEffect(() => {
    if (user && !socket) {
      const socketInstance = io(SOCKET_URL, {
        query: { userId: user.id, role: user.role },
      });

      socketInstance.on("connect", () => {
        console.log("Connected to the socket server.");
        setSocket(socketInstance);
      });

      socketInstance.on("sessionStart", ({ song }) => {
        console.log("Session Started");
        setSessionActive(true);
        setSessionData(song);
      });

      socketInstance.on("sessionEnd", () => {
        console.log("Session End");
        setSessionActive(false);
        setSessionData(null);

        const path = user.role === "admin" ? -1 : "/main/player";
        navigate(path);
      });

      return () => {
        if (socketInstance) socketInstance.close();
      };
    }
  }, [user]);

  return (
    <SocketContext.Provider
      value={{ socket, sessionData, sessionActive, setSessionActive }}
    >
      {children}
    </SocketContext.Provider>
  );
};

function useSocketContext() {
  const context = useContext(SocketContext);
  if (context === undefined)
    throw new Error("SocketContext was used outside SocketContextProvider");
  return context;
}

export { SocketContextProvider, useSocketContext };
