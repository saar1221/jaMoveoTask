import User from "../components/User";
import styles from "./Header.module.css";
function Header() {
  return (
    <header className={styles.header}>
      header
      <User />
    </header>
  );
}

export default Header;
