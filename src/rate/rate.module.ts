import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AdminMiddleware } from 'middlewares/admin.middleware';
import { AuthMiddleware } from 'middlewares/auth.middleware';

@Module({})
export class RateModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'rate', method: RequestMethod.POST });
    consumer
      .apply(AuthMiddleware, AdminMiddleware)
      .forRoutes({ path: 'rate', method: RequestMethod.GET });
  }
}
