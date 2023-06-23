import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
});

@Injectable()
export class RegistrationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    try {
      schema.parse(req.body);
    } catch (e) {
      res.json(e).status(400);
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    next();
  }
}
