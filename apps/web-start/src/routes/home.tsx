import { createFileRoute, Link } from '@tanstack/react-router';
import { useAuth0 } from '@auth0/auth0-react';
import styles from '../styles/page.module.css';

export const Route = createFileRoute('/home')({
  component: RouteComponent,
});

function RouteComponent() {
  const { user, isAuthenticated, isLoading, loginWithRedirect, logout } = useAuth0();

  if (isLoading) return <div className={styles.container}>Loading...</div>;
  if (!isAuthenticated) {
    loginWithRedirect();
    return null;
  }

  return (
    <div className={styles.container}>
      {/* Top Bar */}
      <header className={styles.topBar}>
        <button
          className={styles.left}
          onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
        >
          Logout
        </button>

        <div className={styles.center}>
          {`Welcome, ${user?.name || user?.email}`}
        </div>

        <Link to="/help">
          <button className={styles.right}>?</button>
        </Link>
      </header>

      {/* Add Course Button */}
      <div style={{ margin: '1rem' }}>
        <Link to="/courses/create">
          <button>Add Course</button>
        </Link>
      </div>

      {/* Classes Grid */}
      <main className={styles.center}>
        <Link to="/courses">
          <button>Go to Course Page</button>
        </Link>
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