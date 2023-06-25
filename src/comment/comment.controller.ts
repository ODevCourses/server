import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { z } from 'zod';

@Controller('comment')
export class CommentController {
  constructor(private readonly comment: CommentService) {}

  @Get(':id')
  getComment(@Param('id') id: string) {
    return this.comment.getComment(id);
  }

  @Post()
  createComment(@Req() req, @Body() body) {
    try {
      z.object({
        description: z.string().min(6),
        lessonId: z.string(),
      }).parse(body);
    } catch (e) {
      throw new HttpException(e, HttpStatus.FAILED_DEPENDENCY, {
        cause: new Error(e),
      });
    }
    return this.comment.createComment(body, req.user);
  }

  @Delete()
  deleteComment(@Req() req, @Body('id') id: string) {
    try {
      z.string().parse(id);
    } catch (e) {
      throw new HttpException(e, HttpStatus.FAILED_DEPENDENCY, {
        cause: new Error(e),
      });
    }
    return this.comment.deleteComment(id, req.user);
  }
}
