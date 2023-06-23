import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

const schema = z.object({
  avatar: z.string(),
  name: z.string(),
  description: z.string(),
});

@Injectable()
export class CourseMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    try {
      schema.parse(req.body);
    } catch (e) {
      res.status(400).json(e);
    }
    next();
  }
}
