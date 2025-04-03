import styles from "../../style/Spinner.module.css";

export default function Spinner({ fullScreen = false }) {
  return (
    <div
      className={`${styles.spinnerContainer} ${
        fullScreen ? styles.fullScreen : ""
      }`}
    >
      <div className={styles.spinner}></div>
    </div>
  );
}
