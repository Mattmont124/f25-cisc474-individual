import React from "react";
import Link from "next/link";
import styles from "./page.module.css";

const Page: React.FC = () => {
  return (
    <div className={styles.container}>
      {/* Top Bar */}
      <header className={styles.topBar}>
        <Link href="/Student">
        <button className={styles.left}>Student Sign In</button>
        </Link>
        <div className={styles.center}>Welcome to Course Homepage</div>
        <Link href="/Help"> 
        <button className={styles.right}>?</button>
        </Link>
      </header>

      {/* Classes Grid */}
      <main className={styles.classesGrid}>
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className={styles.classBox}>
            Class {i + 1}
          </div>
        ))}
      </main>

      {/* Bottom Sign-in Buttons */}
      <footer className={styles.signInButtons}>
        <Link href="/Instructor">
          <button>Instructor Sign In</button>
        </Link>
        <Link href="/Admin">
          <button>Admin Sign In</button>
        </Link>
        <Link href="/IT">
          <button>IT Sign In</button>
        </Link>
      </footer>
    </div>
  );
};

export default Page;
