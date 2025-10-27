import { Controller, Get , Param } from '@nestjs/common';
import { CourseService } from './course.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../auth/current-user.decorator';


@Controller('course')
@UseGuards(AuthGuard('jwt'))

export class CourseController {
    constructor(private readonly courseService: CourseService) {}
  @Get()
getCourses(@CurrentUser() user) {
  console.log('Authenticated user:', user);
  return this.courseService.findAll();
}
  @Get()
  findAll() {
    return this.courseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseService.findOne(Number(id));
  }
}
