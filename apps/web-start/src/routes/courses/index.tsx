import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { Link, createFileRoute } from '@tanstack/react-router';
import { useApiQuery, useCurrentUser } from '../../integrations/api';
import { CourseOut } from '../../../../../packages/api/src/courses';

export const Route = createFileRoute('/courses/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: user } = useCurrentUser();
  const query = useApiQuery<Array<CourseOut>>(['courses'], '/courses');

  const { data, refetch, error, showLoading } = query;

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (showLoading) return <div>Loading...</div>;

  if (!data || data.length === 0) {
    return <div>No courses found.</div>;
  }

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/courses/create">Create a New Course</Link>
          </li>
          <li>
            <Link to="/"> Home</Link>
          </li>
        </ul>
      </nav>
      <div>
        Welcome {user?.name} (ID: {user?.id}) to the Courses page!
      </div>
      Courses:
      <article>
        {data.map((course) => (
          <header key={course.id}>
            <Link to="/courses/$courseId" params={{ courseId: course.id }}>
              {course.name}
            </Link>
          </header>
        ))}
      </article>
      <hr></hr>
      <div>
        <button onClick={() => refetch()}>Refetch</button>
      </div>
      <hr></hr>
    </div>
  );
}