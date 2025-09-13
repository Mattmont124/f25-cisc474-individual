import React from "react";
import styles from "../page.module.css"; // Adjust the path if needed

const Instructor: React.FC = () => {
  return (
    <div className={styles.container}>
      <header className={styles.topBar}>
        <div className={styles.left}>Instructor Sign In</div>
        <div className={styles.center}>Welcome to Instructor Dashboard</div>
        <div className={styles.right}>?</div>
      </header>

      <main style={{ marginTop: "40px", textAlign: "center" }}>
        <p>Please sign in to access your classes.</p>
      </main>
    </div>
  );
};

export default Instructor;