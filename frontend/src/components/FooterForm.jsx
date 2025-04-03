import { Link } from "react-router";
import styles from "./FooterForm.module.css";

function FooterForm({ text, path }) {
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
}

export default FooterForm;
