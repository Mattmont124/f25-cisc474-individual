import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { useApiMutation, useCurrentUser } from '../../integrations/api';
import { CourseCreateIn, CourseOut } from '../../../../../packages/api/src/courses'

export const Route = createFileRoute('/courses/create')({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: currentUser } = useCurrentUser();
  const [newName, setNewName] = useState('');
  const [newDescription, setNewDescription] = useState('');

  const mutation = useApiMutation<CourseCreateIn, CourseOut>({
    endpoint: () => ({
      path: '/home',
      method: 'POST',
    }),
    // invalidateKeys expects a readonly array of string tuples
    invalidateKeys: [['home']] as const,
  });

  return (
    <div>
      <header>
        <h1>Create a New Course</h1>
      </header>

      {mutation.isPending ? (
        <div>Creating course...</div>
      ) : (
        <>
          {mutation.isError && (
            <div>Error creating course: {mutation.error.message}</div>
          )}
          {mutation.isSuccess && (
            <div>Course created successfully! ID: {mutation.data.id}</div>
          )}

          <hr />

          <div>
            <input
              type="text"
              placeholder="Course Name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Course Description"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />
          </div>

          <div>
            <button
              onClick={() => {
                if (!currentUser?.id) return; // prevent undefined ownerId
                mutation.mutate({
                  name: newName,
                  description: newDescription || null,
                  ownerId: currentUser.id,
                });
              }}
            >
              Create Course
            </button>
          </div>

          <hr />

          <div>
            <a href="/home">Back to Courses</a>
          </div>
        </>
      )}
    </div>
  );
}
