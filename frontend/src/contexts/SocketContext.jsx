import React, { createContext, useEffect, useState, useContext } from "react";
import { useAuth } from "./AuthContext";
import io from "socket.io-client";

export const SocketContext = createContext();

const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  const [sessionActive, setSessionActive] = useState(false);

  const [sessionData, setSessionData] = useState([null, null]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const socket = io("http://localhost:5000/", {
        query: {
          userId: user._id,
          role: user.role,
        },
      });

      setSocket(socket);

      socket.on("sessionStart", data => {
        setSessionActive(true);
        setSessionData(data);
        console.log("Admin initiated session: ", sessionData);
      });

      socket.on("sessionEnd", () => {
        setSessionActive(false);
        setSessionData([null, null]);
      });

      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [user]);

  return (
    <SocketContext.Provider
      value={{ socket, sessionActive, setSessionActive, sessionData }}
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
