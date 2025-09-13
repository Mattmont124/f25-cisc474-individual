import React from "react";
import styles from "../page.module.css"; // Adjust the path if needed

const Admin: React.FC = () => {
  return (
    <div className={styles.container}>
      <header className={styles.topBar}>
        <div className={styles.left}>What can we help you with?</div>
        <div className={styles.center}>Welcome to the Help Center</div>
        <div className={styles.right}>?</div>
      </header>

      <main style={{ marginTop: "40px", textAlign: "center" }}>
        <p>Please let us know what we can help you with</p>
      </main>
    </div>
  );
};

export default Admin;