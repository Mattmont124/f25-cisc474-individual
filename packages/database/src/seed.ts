import { prisma, SubmissionType } from "./client";

import type { User, Course, Assignment, Submission, Feedback } from "../generated/client";

// --- USERS ---
const DEFAULT_USERS = [
  {
    name: "Tim Apple",
    email: "tim@apple.com",
    role: "INSTRUCTOR",
  },
  {
    name: "Alice Student",
    email: "alice@student.com",
    role: "STUDENT",
  },
  {
    name: "Bob Student",
    email: "bob@student.com",
    role: "STUDENT",
  },
];

// --- COURSES ---
const DEFAULT_COURSES = [
  {
    title: "Introduction to Programming",
    description: "Learn the basics of programming in Python.",
  },
];

// --- ASSIGNMENTS ---
const DEFAULT_ASSIGNMENTS = [
  {
    title: "Hello World Program",
    description: "Write your first Python program.",
    dueDate: new Date("2025-09-30"),
  },
  {
    title: "Loops and Conditionals",
    description: "Practice writing loops and conditionals in Python.",
    dueDate: new Date("2025-10-15"),
  },
];

// --- SUBMISSIONS ---
const DEFAULT_SUBMISSIONS = [
  {
    content: "print('Hello, world!')",
    type: SubmissionType.SANDBOX,
    sandboxUrl: "https://codesandbox.io/s/hello-world-example",
  },
  {
    content: "for i in range(5): print(i)",
    type: SubmissionType.TEXT,
  },
];

// --- FEEDBACK ---
const DEFAULT_FEEDBACK = [
  {
    comment: "Great work Alice!",
    grade: 100,
  },
  {
    comment: "Nice try Bob, but missing edge cases.",
    grade: 70,
  },
];

async function main() {
  // USERS
  const [tim, alice, bob] = await Promise.all(
    DEFAULT_USERS.map((user) =>
      prisma.user.upsert({
        where: { email: user.email },
        update: {
          name: user.name,
        },
        create: {
          email: user.email,
          name: user.name,
        },
      })
    )
  );

  // COURSE (assigned to Tim)
  const [course] = await Promise.all(
    DEFAULT_COURSES.map((c) =>
      prisma.course.create({
        data: {
          title: c.title,
          description: c.description,
          instructorId: tim!.id, 
        },
      })
    )
  );

  if (!course) throw new Error("Course must be created before assignments");

  // ASSIGNMENTS
  const [assignment1, assignment2] = await Promise.all(
    DEFAULT_ASSIGNMENTS.map((a) =>
      prisma.assignment.create({
        data: {
          title: a.title,
          description: a.description,
          dueDate: a.dueDate,
          courseId: course.id, 
        },
      })
    )
  );

  // ENROLLMENTS
  await prisma.enrollment.createMany({
    data: [
      { userId: alice!.id, courseId: course!.id, role: alice!.role},
      { userId: bob!.id, courseId: course!.id, role: bob!.role },
    ],
  });

  // SUBMISSIONS
  const [submission1, submission2] = await Promise.all([
    prisma.submission.create({
      data: {
        content: DEFAULT_SUBMISSIONS[0]!.content,
        type: DEFAULT_SUBMISSIONS[0]!.type,
        sandboxUrl: DEFAULT_SUBMISSIONS[0]?.sandboxUrl,
        studentId: alice!.id,
        assignmentId: assignment1!.id,
      },
    }),
    prisma.submission.create({
      data: {
        content: DEFAULT_SUBMISSIONS[1]!.content,
        type: DEFAULT_SUBMISSIONS[1]!.type,
        studentId: bob!.id,
        assignmentId: assignment2!.id,
      },
    }),
  ]);

  // FEEDBACK
  await Promise.all([
    prisma.feedback.create({
      data: {
        comment: DEFAULT_FEEDBACK[0]!.comment,
        grade: DEFAULT_FEEDBACK[0]!.grade,
        submissionId: submission1.id,
        instructorId: tim!.id,
      },
    }),
    prisma.feedback.create({
      data: {
        comment: DEFAULT_FEEDBACK[1]!.comment,
        grade: DEFAULT_FEEDBACK[1]!.grade,
        submissionId: submission2.id,
        instructorId: tim!.id,
      },
    }),
  ]);

  console.log("Database seeded successfully");
}

main()
  .catch((err) => {
    console.error("Seeding failed:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
