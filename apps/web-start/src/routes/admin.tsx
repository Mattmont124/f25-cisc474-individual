import { createFileRoute } from "@tanstack/react-router";
import styles from "../styles/page.module.css";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

function AdminPage() {
  return (
    <div className={styles.container}>
      <header className={styles.topBar}>
        <div className={styles.left}>Admin Sign In</div>
        <div className={styles.center}>Welcome to Admin Dashboard</div>
        <div className={styles.right}>?</div>
      </header>

      <main style={{ marginTop: "40px", textAlign: "center" }}>
        <p>Please sign in to access your tasks.</p>
      </main>
    </div>
  );
}
