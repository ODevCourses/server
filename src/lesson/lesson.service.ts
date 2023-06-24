import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LessonService {
  constructor(private readonly prisma: PrismaService) {}
  lesson = this.prisma.lesson();

  async getLesson(id: string) {
    return await this.lesson.findUnique({
      where: {
        id,
      },
    });
  }
  createLesson(data: {
    name: string;
    description: string;
    courseId: string;
    authorId: string;
  }) {
    return this.lesson.create({
      data,
    });
  }
  deleteLesson(id: string) {
    return this.lesson.delete({
      where: {
        id,
      },
    });
  }
}
