import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { RateService } from './rate.service';
import { z } from 'zod';

@Controller('rate')
export class RateController {
  constructor(private readonly rate: RateService) {}

  @Get()
  getRate(@Query() query) {
    try {
      z.object({
        score: z.enum(['UP', 'DOWN']),
        type: z.enum(['USER', 'COURSE', 'LESSON', 'COMMENT']),
        authorId: z.string(),
        id: z.string(),
      }).parse(query);
    } catch (e) {
      throw new HttpException(e, HttpStatus.FAILED_DEPENDENCY, {
        cause: new Error(e),
      });
    }
    return this.rate.getRate(query.score, query.type, query.authorId, query.id);
  }

  @Post()
  createRate(@Body() body) {
    try {
      z.object({
        score: z.enum(['UP', 'DOWN']),
        type: z.enum(['USER', 'COURSE', 'LESSON', 'COMMENT']),
        authorId: z.string(),
        id: z.string(),
      }).parse(body);
    } catch (e) {
      throw new HttpException(e, HttpStatus.FAILED_DEPENDENCY, {
        cause: new Error(e),
      });
    }
    return this.rate.createRate(body.score, body.type, body.authorId, body.id);
  }
}
