import { Module } from '@nestjs/common';

import { LinksModule } from './links/links.module';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { CourseController } from './course/course.controller';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [LinksModule, AuthModule],
  controllers: [AppController , CourseController],
  providers: [AppService],
})
export class AppModule {}
