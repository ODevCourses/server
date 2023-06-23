import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { Course } from '@prisma/client';
import { CourseService } from './course.service';
import { Request } from 'express';

@Controller('course')
export class CourseController {
  constructor(private readonly course: CourseService) {}

  @Get(':name')
  async getCourse(@Param('name') name: string): Promise<Course | never> {
    const course = await this.course.getCourse(name);
    if (course === null)
      throw new HttpException("We couldn't find course", HttpStatus.NOT_FOUND);
    return course;
  }

  @Post()
  async createCourse(@Req() req: Request) {
    const course = await this.course.createCourse(req);
    return course;
  }
}
