import React from "react";
import styles from "../page.module.css"; // Adjust the path if needed

const Admin: React.FC = () => {
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
};

export default Admin;