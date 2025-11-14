import { Module } from '@nestjs/common';
import { CourseService } from './courses.service';
import { CoursesController } from './courses.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [CourseService , PrismaService],
  controllers: [CoursesController]
})
export class CourseModule {}
