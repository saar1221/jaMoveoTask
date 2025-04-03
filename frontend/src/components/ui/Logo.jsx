import styles from "./Logo.module.css";

function Logo() {
  return (
    <div className={styles.logoContainer}>
      <img src="/logomark.svg" alt="logo" className={styles.logo} />
      <img src="/JaMoveo.svg" alt="logo" className={styles.logo} />
    </div>
  );
}

export default Logo;
