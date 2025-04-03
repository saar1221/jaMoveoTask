import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuthContext } from "../contexts/AuthContext";

function ProtectedRoute({ children, role }) {
  const { token, user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(
    function () {
      // console.log("@@@@");
      // if (!user || user?.role !== role) {
      //   navigate(`/main/${user.role}`);
      // }

      if (!token) navigate("/");
    },
    [token, navigate]
  );

  return token ? children : null;
}

export default ProtectedRoute;
