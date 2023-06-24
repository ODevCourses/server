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

@Module({
  imports: [PrismaModule, UserModule, CourseModule, LessonModule],
  controllers: [AppController, CourseController],
  providers: [AppService, PrismaService, CourseService],
})
export class AppModule {}
