import { Injectable, NestMiddleware } from '@nestjs/common';
import { User } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'helpers/token.helper';

@Injectable()
export class AdminMiddleware implements NestMiddleware {
  use(req: Request & { user: User }, res: Response, next: NextFunction) {
    if (!req.user) throw 'Permission denied.';
    if (req.user.role === 'USER') throw 'Permission denied.';
    next();
  }
}
