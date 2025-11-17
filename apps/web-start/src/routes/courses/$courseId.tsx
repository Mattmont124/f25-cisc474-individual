import { createFileRoute, Link } from '@tanstack/react-router';
import { useApiQuery, useCurrentUser, useApiMutation } from '../../integrations/api';
import type { CourseOut, CourseUpdateIn } from '@repo/api';
import styles from '../../styles/page.module.css';

export const Route = createFileRoute('/courses/$courseId')({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: user, isLoading: userLoading, isAuthPending } = useCurrentUser();
  const courseId = Route.useParams().courseId;

  const { data: course, showLoading, error, refetch } = useApiQuery<CourseOut>(
    ['courses', courseId],
    `/courses/${courseId}`
  );

  // Mutations
  const updateCourseMutation = useApiMutation<CourseUpdateIn, CourseOut>({
    endpoint: () => ({
      path: `/courses/${courseId}`,
      method: 'PATCH',
    }),
    invalidateKeys: [['courses'], ['courses', courseId]],
  });

  const deleteCourseMutation = useApiMutation<{ id: string }, void>({
    endpoint: () => ({
      path: `/courses/${courseId}`,
      method: 'DELETE',
    }),
    invalidateKeys: [['courses']],
  });

  if (isAuthPending || userLoading || showLoading) {
    return <div className={styles.container}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.container}>Error: {error.message}</div>;
  }

  if (!course) {
    return <div className={styles.container}>Course not found</div>;
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

      {/* Course Info */}
      <main className={styles.classesGrid}>
        <div className={styles.classBox}>
          <h1>{course.name}</h1>
          <p>{course.description}</p>
          <p><strong>Owner ID:</strong> {course.ownerId}</p>
          <p><strong>Course ID:</strong> {course.id}</p>

          {/* Update/Delete Buttons */}
          <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
            <button
              onClick={() => {
                const newName = prompt('New course name:', course.name);
                const newDescription = prompt('New course description:', undefined);
                if (newName || newDescription) {
                  updateCourseMutation.mutate({
                    name: newName || course.name,
                    description: newDescription || course.description,
                  });
                }
              }}
            >
              Update
            </button>
            <button
              onClick={() => {
                if (confirm('Are you sure you want to delete this course?')) {
                  deleteCourseMutation.mutate({ id: course.id });
                }
              }}
            >
              Delete
            </button>
          </div>

          <Link to="/courses">
            <button style={{ marginTop: '1rem' }}>Back to Courses</button>
          </Link>
        </div>
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
