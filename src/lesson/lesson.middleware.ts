import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

const schema = z.object({
  name: z.string(),
  description: z.string(),
  courseId: z.string(),
  authorId: z.string(),
});

@Injectable()
export class LessonMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    try {
      schema.parse(req.body);
    } catch (e) {
      return res.status(400).json(e);
    }
    next();
  }
}
