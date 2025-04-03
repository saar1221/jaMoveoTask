import { useState, useEffect } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router";

export function useSignupAuth() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [instrument, setInstrument] = useState("");
  const [role, setRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { register, user, token, isAuthenticated } = useAuthContext();

  const navigate = useNavigate();
  useEffect(() => {
    console.log("useSignupAuth");
    if (isAuthenticated && user?.role) {
      if (user.role === "admin") {
        navigate("/main/admin");
      } else {
        navigate("/main/player");
      }
    }
  }, [isAuthenticated, token]);
  return {
    username,
    setUserName,
    password,
    setPassword,
    isLoading,
    setIsLoading,
    register,
    instrument,
    setInstrument,
    role,
    setRole,
  };
}
