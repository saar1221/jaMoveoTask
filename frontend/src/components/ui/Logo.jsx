import styles from "../../style/Logo.module.css";
import { isMobile } from "react-device-detect";

export default function Logo() {
  return (
    !isMobile && (
      <div className={styles.logoContainer}>
        <img src="/logomark.svg" alt="logo" className={styles.logo} />
        <img src="/JaMoveo.svg" alt="logo" className={styles.logo} />
      </div>
    )
  );
}
