import { createFileRoute } from '@tanstack/react-router';
import styles from '../../styles/page.module.css';

export const Route = createFileRoute('/class/$id')({
  component: ClassPage,
});

function ClassPage() {
  // Access the route params safely via TanStack’s hook:
  const { id } = Route.useParams();

  return (
    <div className={styles.container}>
      <header className={styles.topBar}>
        <div className={styles.center}>Class {id}</div>
      </header>
      <main className={styles.classesGrid}>
        <p>This is the detail page for Class {id}.</p>
      </main>
    </div>
  );
}