import React, { createContext, useEffect, useState, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

export const SocketContext = createContext();

const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [sessionActive, setSessionActive] = useState(false);
  const { user } = useAuthContext();

  useEffect(() => {
    if (user && !socket) {
      const socketInstance = io("http://localhost:4000", {
        query: { userId: user._id, role: user.role },
      });

      socketInstance.on("connect", () => {
        console.log("Connected to the socket server.");
        setSocket(socketInstance);
      });

      socketInstance.on("sessionStart", data => {
        setSessionActive(true);
        console.log("Session started:", data);
      });

      socketInstance.on("sessionEnd", () => {
        setSessionActive(false);
      });

      return () => {
        if (socketInstance) socketInstance.close();
      };
    }
  }, [user]);

  return (
    <SocketContext.Provider value={{ socket, sessionActive, setSessionActive }}>
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
