import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { CourseController } from './course/course.controller';
import { CourseService } from './course/course.service';
import { CourseModule } from './course/course.module';

@Module({
  imports: [PrismaModule, UserModule, CourseModule],
  controllers: [AppController, CourseController],
  providers: [AppService, PrismaService, CourseService],
})
export class AppModule {}
