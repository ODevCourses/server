import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthMiddleware } from 'middlewares/auth.middleware';

@Module({
  imports: [PrismaModule],
  providers: [CommentService],
  controllers: [CommentController],
})
export class CommentModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'comment', method: RequestMethod.POST });
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'comment', method: RequestMethod.DELETE });
  }
}
