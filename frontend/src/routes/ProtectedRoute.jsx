import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuthContext } from "../contexts/AuthContext";

function ProtectedRoute({ children }) {
  const { token } = useAuthContext();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!token) navigate("/");
    },
    [token, navigate]
  );

  return token ? children : null;
}

export default ProtectedRoute;
