import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AuthMiddleware } from 'middlewares/auth.middleware';
import { LessonMiddleware } from './lesson.middleware';
import { PrismaModule } from 'src/prisma/prisma.module';
import { LessonController } from './lesson.controller';
import { LessonService } from './lesson.service';

@Module({
  imports: [PrismaModule],
  providers: [LessonService],
  controllers: [LessonController],
})
export class LessonModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware, LessonMiddleware)
      .forRoutes({ path: 'lesson', method: RequestMethod.POST });
  }
}
