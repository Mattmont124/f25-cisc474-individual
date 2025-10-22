import { createFileRoute } from "@tanstack/react-router";
import styles from "../styles/page.module.css";

export const Route = createFileRoute("/it")({
  component: ITPage,
});

function ITPage() {
  return (
    <div className={styles.container}>
      <header className={styles.topBar}>
        <div className={styles.left}>IT Sign In</div>
        <div className={styles.center}>Welcome IT Department</div>
        <div className={styles.right}>?</div>
      </header>
      <main style={{ textAlign: "center", marginTop: "40px" }}>
        <p>Monitor system status and manage technical issues.</p>
      </main>
    </div>
  );
}