import { useNavigate } from "react-router";
import { useAuthContext } from "../contexts/AuthContext";
import styles from "../style/User.module.css";

function User() {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();

  function handleClick() {
    logout();
    navigate("/");
  }

  return (
    <div className={styles.user}>
      <img src={user.avatar} alt={user.name} />
      <span>Welcome, {user.username} </span>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
}

export default User;
