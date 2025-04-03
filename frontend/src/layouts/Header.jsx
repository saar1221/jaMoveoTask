import User from "../components/User";
import styles from "../style/Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <User />
    </header>
  );
}
