import { createFileRoute } from "@tanstack/react-router";
import styles from "../styles/page.module.css";

export const Route = createFileRoute("/student")({
  component: StudentPage,
});

function StudentPage() {
  return (
    <div className={styles.container}>
      <header className={styles.topBar}>
        <div className={styles.left}>Student Sign In</div>
        <div className={styles.center}>Welcome Student</div>
        <div className={styles.right}>?</div>
      </header>
      <main style={{ textAlign: "center", marginTop: "40px" }}>
        <p>Select a class to view assignments and grades.</p>
      </main>
    </div>
  );
}