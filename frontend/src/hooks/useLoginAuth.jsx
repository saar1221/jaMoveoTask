import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuthContext } from "../contexts/AuthContext";

export function useLoginAuth() {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { token, user, login } = useAuthContext();

  useEffect(() => {
    if (token && user?.role) {
      if (user.role === "admin") {
        navigate("/main/admin");
      } else {
        navigate("/main/player");
      }
    }
  }, [token, user, navigate]);
  return {
    username,
    setUserName,
    password,
    setPassword,
    isLoading,
    setIsLoading,
    login,
    token,
  };
}
