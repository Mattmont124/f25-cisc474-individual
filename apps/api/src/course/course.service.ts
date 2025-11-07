import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service'; // adjust path as needed
import { CourseCreateIn, CourseOut, CourseUpdateIn } from '@repo/api/courses';

@Injectable()
export class CourseService {
  // --- GET /courses ---
  constructor(private prisma: PrismaService) {}
  async create (createCourse: CourseCreateIn): Promise<CourseOut> {
    const newCourse = await this.prisma.course.create({
      data: createCourse,
    });
    return {
      name: newCourse.name,
      description: newCourse.description,
      ownerId: newCourse.ownerId,
      id: newCourse.id,
      createdAt: newCourse.createdAt.toString(),
      updatedAt: newCourse.updatedAt.toString(),
        };
  }

  // --- GET /courses/:id ---
  findAll() {
    return this.prisma.course.findMany();
  }

  findOne(id: string) {
    return this.prisma.course.findUnique({
      where: { id },
    });
  }

  update(id: string, updateCourseDto: CourseUpdateIn) {
    return this.prisma.course.update({
      where: { id },
      data: updateCourseDto,
    });
  }

  remove(id: string) {
    return this.prisma.course.delete({
      where: { id },
    });
  }
}