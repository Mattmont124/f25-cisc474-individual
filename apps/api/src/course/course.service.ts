import { Injectable } from '@nestjs/common';
import { prisma } from '@repo/database/src/client'; // adjust path as needed
import { CourseCreateIn } from '../../../../packages/api/src/courses';

@Injectable()
export class CourseService {
  // --- GET /courses ---
  async findAll() {
    return prisma.course.findMany({
      include: {
        instructor: true, // optional: include related instructor data
      },
    });
  }

  // --- GET /courses/:id ---
  async findOne(id: string) {
    return prisma.course.findUnique({
      where: { id },
      include: {
        instructor: true,
        assignments: true,
      },
    });
  }

  // --- POST /courses ---
  async create(data: CourseCreateIn) {
    return prisma.course.create({
      data: {
        title: data.name,
        description: data.description ?? null,
        instructorId: data.ownerId,
      },
    });
  }
}
