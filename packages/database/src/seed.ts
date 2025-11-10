// seed.ts — Fake data generator for your Prisma schema
// Run with: npx ts-node seed.ts (after building the Prisma Client)
// Requires: npm i @faker-js/faker ts-node typescript

import { faker } from '@faker-js/faker';
import { prisma } from './client';
import { PrismaClient, RoleType, Prisma } from '../generated/client';

/** Options to control how much data to generate */
export type SeedOptions = {
  users: number;
  instructors: number; // number of instructors to mark among users
  coursesPerInstructor: number;
  studentsPerCourse: number;
  tasPerCourse: number;
  groupsPerCourse: number;
  assignmentsPerCourse: number;
  submissionsPerStudentPerAssignment: number; // usually 1
  seed?: number;
};

/** Default settings */
export const defaultOptions: SeedOptions = {
  users: 60,
  instructors: 8,
  coursesPerInstructor: 2,
  studentsPerCourse: 20,
  tasPerCourse: 2,
  groupsPerCourse: 3,
  assignmentsPerCourse: 5,
  submissionsPerStudentPerAssignment: 1,
  seed: 42,
};

const PROVIDERS = ['google', 'github', 'passwordless'] as const;

type Created = {
  users: Prisma.UserGetPayload<{}>[];
  instructors: Prisma.UserGetPayload<{}>[];
  students: Prisma.UserGetPayload<{}>[];
  tas: Prisma.UserGetPayload<{}>[];
  courses: Prisma.CourseGetPayload<{}>[];
  groups: Prisma.AssignmentGroupGetPayload<{}>[];
  assignments: Prisma.AssignmentGetPayload<{}>[];
};

/** Utility helpers */
function pickMany<T>(arr: T[], n: number): T[] {
  if (n <= 0) return [];
  const copy = [...arr];
  faker.helpers.shuffle(copy);
  return copy.slice(0, Math.min(n, copy.length));
}

function takeUniqueEmails(count: number) {
  const emails = new Set<string>();
  const out: string[] = [];
  while (out.length < count) {
    const e = faker.internet
      .email({
        firstName: faker.person.firstName().toLowerCase(),
        lastName: faker.person.lastName().toLowerCase(),
        provider: 'example.com',
      })
      .toLowerCase();
    if (!emails.has(e)) {
      emails.add(e);
      out.push(e);
    }
  }
  return out;
}

/** Reset tables (idempotent) */
export async function resetDatabase() {
  await prisma.$transaction([
    prisma.submission.deleteMany({}),
    prisma.role.deleteMany({}),
    prisma.authentication.deleteMany({}),
    prisma.assignmentGroup.deleteMany({}),
    prisma.assignment.deleteMany({}),
    prisma.course.deleteMany({}),
    prisma.user.deleteMany({}),
  ]);
}

/** Create Users + optional authentications */
export async function createUsers(count: number) {
  const emails = takeUniqueEmails(count);
  const users = await Promise.all(
    emails.map((email, i) =>
      prisma.user.create({
        data: {
          name: faker.person.fullName(),
          email: faker.datatype.boolean(0.9) ? email : null, // keep some null to respect optional + unique
          emailVerified: faker.datatype.boolean(0.6)
            ? faker.date.recent({ days: 90 })
            : null,
        },
      }),
    ),
  );

  // add 0–2 authentications per user
  await Promise.all(
    users.flatMap((u) => {
      const n = faker.number.int({ min: 0, max: 2 });
      return Array.from({ length: n }).map(() =>
        prisma.authentication.create({
          data: {
            userId: u.id,
            provider: faker.helpers.arrayElement(PROVIDERS),
            providerId: faker.string.uuid(),
          },
        }),
      );
    }),
  );

  return users;
}

/** Create Courses owned by instructors */
export async function createCourses(
  instructors: Prisma.UserGetPayload<{}>[],
  coursesPerInstructor: number,
) {
  const courses: Prisma.CourseGetPayload<{}>[] = [];
  for (const owner of instructors) {
    for (let i = 0; i < coursesPerInstructor; i++) {
      const course = await prisma.course.create({
        data: {
          ownerId: owner.id,
          name: `${faker.company.catchPhrase()} ${faker.number.int({ min: 100, max: 499 })}`,
          description: faker.lorem.sentence(),
          // give owner an instructor role in their own course
          roles: {
            create: {
              userId: owner.id,
              role: RoleType.INSTRUCTOR,
            },
          },
        },
      });
      courses.push(course);
    }
  }
  return courses;
}

/** Enroll users into courses via Role records */
export async function addCourseMemberships(params: {
  courses: Prisma.CourseGetPayload<{}>[];
  students: Prisma.UserGetPayload<{}>[];
  tas: Prisma.UserGetPayload<{}>[];
  studentsPerCourse: number;
  tasPerCourse: number;
}) {
  const memberships: Prisma.RoleGetPayload<{}>[] = [];
  for (const course of params.courses) {
    const pickedStudents = pickMany(params.students, params.studentsPerCourse);
    const pickedTAs = pickMany(params.tas, params.tasPerCourse);

    await prisma.$transaction([
      // students
      prisma.role.createMany({
        data: pickedStudents.map((u) => ({
          userId: u.id,
          courseId: course.id,
          role: RoleType.STUDENT,
        })),
        skipDuplicates: true,
      }),
      // TAs
      prisma.role.createMany({
        data: pickedTAs.map((u) => ({
          userId: u.id,
          courseId: course.id,
          role: RoleType.TA,
        })),
        skipDuplicates: true,
      }),
    ]);
  }
  return memberships;
}

/** Create Assignment Groups per course */
export async function createAssignmentGroups(
  courses: Prisma.CourseGetPayload<{}>[],
  groupsPerCourse: number,
) {
  const groups: Prisma.AssignmentGroupGetPayload<{}>[] = [];
  for (const c of courses) {
    for (let i = 0; i < groupsPerCourse; i++) {
      const g = await prisma.assignmentGroup.create({
        data: {
          ownerId: c.ownerId,
          courseId: c.id,
          name: `${faker.helpers.arrayElement(['Homework', 'Projects', 'Labs', 'Quizzes'])} ${i + 1}`,
          description: faker.lorem.sentence(),
        },
      });
      groups.push(g);
    }
  }
  return groups;
}

/** Create Assignments per course and randomly connect to groups */
export async function createAssignments(
  courses: Prisma.CourseGetPayload<{}>[],
  groupsByCourse: Map<string, Prisma.AssignmentGroupGetPayload<{}>[]>,
  assignmentsPerCourse: number,
) {
  const assignments: Prisma.AssignmentGetPayload<{}>[] = [];
  for (const c of courses) {
    for (let i = 0; i < assignmentsPerCourse; i++) {
      const a = await prisma.assignment.create({
        data: {
          ownerId: c.ownerId,
          courseId: c.id,
          title: `${faker.hacker.verb()} ${faker.hacker.noun()} #${i + 1}`,
          description: faker.lorem.paragraph(),
        },
      });
      assignments.push(a);

      // randomly connect the assignment to 1–2 groups within the same course
      const courseGroups = groupsByCourse.get(c.id) ?? [];
      const selected = pickMany(
        courseGroups,
        faker.number.int({
          min: 1,
          max: Math.min(2, courseGroups.length || 1),
        }),
      );
      if (selected.length) {
        await prisma.assignment.update({
          where: { id: a.id },
          data: {
            groups: {
              connect: selected.map((g) => ({ id: g.id })),
            },
          },
        });
      }
    }
  }
  return assignments;
}

/** Create Submissions for each student on each assignment within a course */
export async function createSubmissions(params: {
  assignments: Prisma.AssignmentGetPayload<{}>[];
  courses: Prisma.CourseGetPayload<{}>[];
  submissionsPerStudentPerAssignment: number;
}) {
  // Build course->student roster from Role table
  const roles = await prisma.role.findMany({
    where: { role: RoleType.STUDENT },
  });
  const studentsByCourse = new Map<string, string[]>(); // courseId -> userIds
  for (const r of roles) {
    const arr = studentsByCourse.get(r.courseId) || [];
    arr.push(r.userId);
    studentsByCourse.set(r.courseId, arr);
  }

  for (const a of params.assignments) {
    const roster = studentsByCourse.get(a.courseId) || [];
    for (const studentId of roster) {
      for (let s = 0; s < params.submissionsPerStudentPerAssignment; s++) {
        await prisma.submission.create({
          data: {
            assignmentId: a.id,
            userId: studentId,
            courseId: a.courseId,
            content: faker.lorem.paragraphs({ min: 1, max: 3 }),
            grade: faker.helpers.arrayElement([
              'A',
              'A-',
              'B+',
              'B',
              'B-',
              'C+',
              'C',
              'IP',
            ]),
          },
        });
      }
    }
  }
}

/** Top-level orchestrator */
export async function generateFakeData(opts: Partial<SeedOptions> = {}) {
  const options = { ...defaultOptions, ...opts };
  if (options.seed !== undefined) faker.seed(options.seed);

  // 1) Users
  const users = await createUsers(options.users);
  console.log(`Created ${users.length} users`);

  // choose instructors, TAs, students partitions
  const instructors = pickMany(users, options.instructors);
  const remaining = users.filter(
    (u) => !instructors.some((i) => i.id === u.id),
  );
  const tas = pickMany(
    remaining,
    Math.max(5, Math.floor(remaining.length * 0.15)),
  );
  const students = remaining.filter((u) => !tas.some((t) => t.id === u.id));

  // 2) Courses (owned by instructors)
  const courses = await createCourses(
    instructors,
    options.coursesPerInstructor,
  );
  console.log(`Created ${courses.length} courses`);

  // 3) Memberships (students & TAs per course)
  await addCourseMemberships({
    courses,
    students,
    tas,
    studentsPerCourse: options.studentsPerCourse,
    tasPerCourse: options.tasPerCourse,
  });
  console.log(`Enrolled students and TAs into courses`);

  // 4) Assignment Groups per course
  const groups = await createAssignmentGroups(courses, options.groupsPerCourse);
  const groupsByCourse = new Map<
    string,
    Prisma.AssignmentGroupGetPayload<{}>[]
  >();
  for (const g of groups) {
    const arr = groupsByCourse.get(g.courseId) || [];
    arr.push(g);
    groupsByCourse.set(g.courseId, arr);
  }
  console.log(`Created ${groups.length} assignment groups`);

  // 5) Assignments per course (+ connect to groups)
  const assignments = await createAssignments(
    courses,
    groupsByCourse,
    options.assignmentsPerCourse,
  );
  console.log(`Created ${assignments.length} assignments`);

  // 6) Submissions for each student per assignment
  await createSubmissions({
    assignments,
    courses,
    submissionsPerStudentPerAssignment:
      options.submissionsPerStudentPerAssignment,
  });
  console.log(`Created submissions for students on assignments`);

  const summary: Created = {
    users,
    instructors,
    students,
    tas,
    courses,
    groups,
    assignments,
  };

  return summary;
}

/** If run directly, reset DB and generate with defaults */
if (require.main === module) {
  (async () => {
    console.time('seed');
    try {
      await resetDatabase();
      const result = await generateFakeData();
      console.log('Created users:', result.users.length);
      console.log('Courses:', result.courses.length);
      console.log('Assignments:', result.assignments.length);
      console.log('Groups:', result.groups.length);
    } catch (err) {
      console.error(err);
      process.exitCode = 1;
    } finally {
      await prisma.$disconnect();
      console.timeEnd('seed');
    }
  })();
}