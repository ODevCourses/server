import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AuthMiddleware } from 'middlewares/auth.middleware';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CourseMiddleware } from './course.middleware';

@Module({
  imports: [PrismaModule],
  providers: [CourseService],
  controllers: [CourseController],
})
export class CourseModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware, CourseMiddleware)
      .forRoutes({ path: 'course', method: RequestMethod.POST });
  }
}
