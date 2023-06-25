import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { CourseController } from './course/course.controller';
import { CourseService } from './course/course.service';
import { CourseModule } from './course/course.module';
import { LessonModule } from './lesson/lesson.module';
import { CommentModule } from './comment/comment.module';
import { RateController } from './rate/rate.controller';
import { RateService } from './rate/rate.service';
import { RateModule } from './rate/rate.module';

@Module({
  imports: [PrismaModule, UserModule, CourseModule, LessonModule, CommentModule, RateModule],
  controllers: [AppController, CourseController, RateController],
  providers: [AppService, PrismaService, CourseService, RateService],
})
export class AppModule {}
