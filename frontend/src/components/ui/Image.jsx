import styles from "../../style/Image.module.css";
import { isMobile } from "react-device-detect";
export default function Image({ name = "" }) {
  return (
    !isMobile && (
      <img className={styles.img} src={`/${name}.png`} alt="some-guys" />
    )
  );
}
