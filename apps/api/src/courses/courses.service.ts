import { Injectable } from '@nestjs/common';
import { CourseCreateIn, CourseUpdateIn, CourseOut } from '@repo/api/courses';
import { PrismaService } from '../prisma.service';
import { Course } from '@repo/database';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}
  async create(createCourseDto: CourseCreateIn): Promise<CourseOut> {
    const newCourse = await this.prisma.course.create({
      data: createCourseDto,
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
  getCourses() {
    return [
      { id: 1, name: 'CISC474', description: 'Web Applications' },
      { id: 2, name: 'CISC275', description: 'Intro to Software Engineering' },
      { id: 3, name: 'CISC361', description: 'Operating Systems' },
    ];
  }
}