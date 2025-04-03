import Header from "./Header";
import { Outlet } from "react-router";
import styles from "../style/AppLayout.module.css";

export default function AppLayout() {
  return (
    <div className={styles.app}>
      <Header />
      <Outlet />
    </div>
  );
}
