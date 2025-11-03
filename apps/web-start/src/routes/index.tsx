// src/routes/index.tsx
import { createFileRoute } from '@tanstack/react-router';
import { useAuth0 } from '@auth0/auth0-react';
import styles from '../styles/page.module.css';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { isAuthenticated, loginWithRedirect, isLoading } = useAuth0();

  if (isLoading) {
    return <div className={styles.container}>Loading...</div>;
  }

  // If already logged in, go straight to home
  if (isAuthenticated) {
    window.location.href = '/home';
    return null;
  }

  return (
    <div className={styles.container}>
      <header className={styles.topBar}>
        <div className={styles.center}>Welcome to the Course Portal</div>
      </header>

      <main className={styles.classesGrid}>
        <button className={styles.classBox} onClick={() => loginWithRedirect()}>
          Login to Continue
        </button>
      </main>

      <footer className={styles.signInButtons}>
        <p></p>
      </footer>
    </div>
  );
}