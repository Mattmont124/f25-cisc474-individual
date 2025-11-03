import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../auth/current-user.decorator';
import { CourseCreateIn } from '../../../../packages/api/src/courses'; // shared DTO type

@Controller('courses') // match frontend endpoint (/courses)
@UseGuards(AuthGuard('jwt'))
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  // --- GET /courses ---
  @Get()
  async getCourses(@CurrentUser() user: any) {
    console.log('Authenticated user:', user);
    // You could also filter by user if needed
    return this.courseService.findAll();
  }

  // --- GET /courses/:id ---
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.courseService.findOne(String(id));
  }

  // --- POST /courses ---
  @Post()
  async createCourse(@Body() data: CourseCreateIn, @CurrentUser() user: any) {
    // Ensure we assign ownerId automatically if not provided
    const payload = {
      ...data,
      ownerId: data.ownerId || user?.id,
    };

    return this.courseService.create(payload);
  }
}