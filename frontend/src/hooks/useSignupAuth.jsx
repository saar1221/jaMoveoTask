import { useState, useEffect } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router";

export function useSignupAuth() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [instrument, setInstrument] = useState("");
  const [role, setRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { register, user, token } = useAuthContext();

  const navigate = useNavigate();
  useEffect(() => {
    if (token && user?.role) {
      if (user.role === "admin") {
        navigate("/main/admin");
      } else {
        navigate("/main/player");
      }
    }
  }, [user, navigate, token]);
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
