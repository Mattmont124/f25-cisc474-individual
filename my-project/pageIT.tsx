import React from "react";
import styles from "../page.module.css"; // Adjust the path if needed

const IT: React.FC = () => {
  return (
    <div className={styles.container}>
      <header className={styles.topBar}>
        <div className={styles.left}>IT Sign In</div>
        <div className={styles.center}>Welcome to IT Dashboard</div>
        <div className={styles.right}>?</div>
      </header>

      <main style={{ marginTop: "40px", textAlign: "center" }}>
        <p>Welcome to IT, please login to complete tasks.</p>
      </main>
    </div>
  );
};

export default IT;