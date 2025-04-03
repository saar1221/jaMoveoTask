import Header from "./Header";
import { Outlet } from "react-router";
import styles from "./AppLayout.module.css";

function AppLayout() {
  return (
    <div className={styles.app}>
      <Header />
      <Outlet />
    </div>
  );
}

export default AppLayout;
