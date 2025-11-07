import { createFileRoute, Link } from '@tanstack/react-router';
import { useAuth0 } from '@auth0/auth0-react';
import { useQuery } from '@tanstack/react-query';
import type { CourseOut } from '@repo/api/courses';
import styles from '../styles/page.module.css';


export const Route = createFileRoute('/home')({
  component: RouteComponent,
});

async function fetchCourses(token: string): Promise<Array<CourseOut>> {
  const res = await fetch('/api/courses', {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch courses');
  }
  return res.json();
}

function RouteComponent() {
  const { user, isAuthenticated, isLoading, loginWithRedirect, logout, getAccessTokenSilently } = useAuth0();

  const { data: courses = [], isLoading: loadingCourses } = useQuery<Array<CourseOut>>({
    queryKey: ['courses'],
    queryFn: async () => {
      const token = await getAccessTokenSilently();
      return fetchCourses(token);
    },
    enabled: isAuthenticated,
  });

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
      <main className={styles.classesGrid}>
        {loadingCourses
          ? 'Loading courses...'
          : courses.map((course) => (
              <div key={course.id} className={styles.classBox}>
                <Link to="/class/$id" params={{ id: course.id }} className={styles.classLink}>
                  {course.name}
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
