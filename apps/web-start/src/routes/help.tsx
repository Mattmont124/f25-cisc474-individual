import { createFileRoute } from "@tanstack/react-router";
import styles from "../styles/page.module.css";

export const Route = createFileRoute("/help")({
  component: HelpPage,
});

function HelpPage() {
  return (
    <div className={styles.container}>
      <header className={styles.topBar}>
        <div className={styles.center}>Help Center</div>
      </header>
      <main style={{ textAlign: "center", marginTop: "40px" }}>
        <p>Need assistance? Contact support at help@example.com.</p>
      </main>
    </div>
  );
}