import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { LessonService } from './lesson.service';

@Controller('lesson')
export class LessonController {
  constructor(private readonly lesson: LessonService) {}

  @Get(':name')
  async getLesson(@Param('name') name: string) {
    const lesson = await this.lesson.getLesson(name);
    if (lesson === null)
      throw new HttpException("We couldn't find lesson", HttpStatus.NOT_FOUND);
    return lesson;
  }

  @Post()
  createLesson(@Body() body) {
    console.log('POST');
    return this.lesson.createLesson(body);
  }

  @Delete()
  deleteLesson(@Body('id') id: string) {
    return this.lesson.deleteLesson(id);
  }
}
