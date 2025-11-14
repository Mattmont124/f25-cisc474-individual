import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { CourseModule } from './courses/courses.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, CourseModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}