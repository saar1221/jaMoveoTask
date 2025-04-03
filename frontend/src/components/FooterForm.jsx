import { Link } from "react-router";
import styles from "../style/FooterForm.module.css";

const FooterForm = ({ text, path }) => {
  return (
    <div className={styles.footerForm}>
      <p>
        {text}
        <Link to={`/${path}`}>
          <strong> {path}</strong>
        </Link>
      </p>
    </div>
  );
};

export default FooterForm;
