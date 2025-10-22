import { createFileRoute } from "@tanstack/react-router";
import styles from "../styles/page.module.css";

export const Route = createFileRoute("/instructor")({
  component: InstructorPage,
});

function InstructorPage() {
  return (
    <div className={styles.container}>
      <header className={styles.topBar}>
        <div className={styles.left}>Instructor Sign In</div>
        <div className={styles.center}>Welcome Instructor</div>
        <div className={styles.right}>?</div>
      </header>
      <main style={{ textAlign: "center", marginTop: "40px" }}>
        <p>View and manage your assigned courses here.</p>
      </main>
    </div>
  );
}