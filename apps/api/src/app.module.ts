import { Module } from '@nestjs/common';


import { AppService } from './app.service';
import { AppController } from './app.controller';
import { CourseController } from './course/course.controller';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [ AuthModule],
  controllers: [AppController , CourseController],
  providers: [AppService],
})
export class AppModule {}
