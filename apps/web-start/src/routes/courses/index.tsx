import { createFileRoute, Link } from '@tanstack/react-router';
import { useApiQuery, useCurrentUser } from '../../integrations/api';
import type { CourseOut } from '@repo/api';
import styles from '../../styles/page.module.css';

export const Route = createFileRoute('/courses/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: user, isLoading: userLoading, isAuthPending } = useCurrentUser();
  const { data: courses, showLoading, error, refetch } = useApiQuery<Array<CourseOut>>(
    ['courses'],
    '/courses'
  );

  if (isAuthPending || userLoading || showLoading) {
    return <div className={styles.container}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.container}>Error: {error.message}</div>;
  }

  if (!courses || courses.length === 0) {
    return <div className={styles.container}>No courses found.</div>;
  }

  return (
    <div className={styles.container}>
      {/* Top Bar */}
      <header className={styles.topBar}>
        <Link to="/home">
          <button className={styles.left}>Home</button>
        </Link>

        <div className={styles.center}>
          {`Welcome, ${user?.name || user?.email}`}
        </div>

        <Link to="/help">
          <button className={styles.right}>?</button>
        </Link>
      </header>

      {/* Courses Grid */}
      <main className={styles.classesGrid}>
        {courses.map((course) => (
          <div key={course.id} className={styles.classBox}>
            <Link to="/courses/$courseId" params={{ courseId: course.id }}>
              {course.name}
            </Link>
          </div>
        ))}
      </main>

      {/* Footer */}
      <footer className={styles.signInButtons}>
        <Link to="/courses/create">
          <button>Create a New Course</button>
        </Link>
        <Link to="/instructor">
          <button>Instructor Sign In</button>
        </Link>
        <Link to="/admin">
          <button>Admin Sign In</button>
        </Link>
        <Link to="/it">
          <button>IT Sign In</button>
        </Link>
        <button onClick={() => refetch()}>Refetch Courses</button>
      </footer>
    </div>
  );
}
