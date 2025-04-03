import styles from "./Spinner.module.css";

function Spinner({ fullScreen = false }) {
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

export default Spinner;
