import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CoursesController } from './course.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [CourseService , PrismaService],
  controllers: [CoursesController]
})
export class CourseModule {}
