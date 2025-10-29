// src/routes/index.tsx
import { Link, createFileRoute } from '@tanstack/react-router';
import { useAuth0 } from '@auth0/auth0-react';
import styles from '../styles/page.module.css';
import LoginButton from '../routes/components/LoginButton';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  return (
    <div className={styles.container}>
      {/* Top Bar */}
      <header className={styles.topBar}>
        {!isAuthenticated ? (
          <button className={styles.left} onClick={() => loginWithRedirect()}>
            Login
          </button>
        ) : (
          <button
  className={styles.left}
  onClick={() =>
    logout({ logoutParams: { returnTo: window.location.origin } })}>  Logout</button>
        )}
        <div className={styles.center}>
          {isAuthenticated
            ? `Welcome, ${user?.name || user?.email}`
            : 'Welcome to Course Homepage'}
        </div>
        <Link to="/help">
          <button className={styles.right}>?</button>
        </Link>
      </header>

      {/* Classes Grid */}
      <main className={styles.classesGrid}>
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className={styles.classBox}>
            <Link
              to="/class/$id"
              params={{ id: String(i + 1) }}
              className={styles.classLink}
            >
              Class {i + 1}
            </Link>
          </div>
        ))}
      </main>

      {/* Footer */}
      <footer className={styles.signInButtons}>
        <Link to="/instructor">
          <button>Instructor Sign In</button>
        </Link>
        <Link to="/admin">
          <button>Admin Sign In</button>
        </Link>
        <Link to="/it">
          <button>IT Sign In</button>
        </Link>
      </footer>
    </div>
  );
}