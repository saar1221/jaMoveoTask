import styles from "./Image.module.css";
function Image({ name = "" }) {
  return <img className={styles.img} src={`/${name}.png`} alt="some-guys" />;
}

export default Image;
