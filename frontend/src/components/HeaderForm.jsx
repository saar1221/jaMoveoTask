import styles from "../style/HeaderForm.module.css";
const HeaderForm = ({ children }) => {
  return (
    <div>
      <h2>Welcome to JaMoveo</h2>
      <h1 className={styles.title}>{children}</h1>
    </div>
  );
};

export default HeaderForm;
