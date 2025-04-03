import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuthContext } from "../contexts/AuthContext";

export function useLoginAuth() {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { token, user, login, isAuthenticated } = useAuthContext();

  useEffect(() => {
    console.log(user, token, "isAuthenticated");
    if (isAuthenticated && user?.role) {
      if (user.role === "admin") {
        navigate("/main/admin");
      } else {
        navigate("/main/player");
      }
    }
  }, [isAuthenticated]);
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
