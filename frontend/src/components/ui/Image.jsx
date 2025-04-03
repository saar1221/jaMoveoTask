import styles from "../../style/Image.module.css";
export default function Image({ name = "" }) {
  return <img className={styles.img} src={`/${name}.png`} alt="some-guys" />;
}
