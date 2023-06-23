import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CourseService {
  constructor(private readonly prisma: PrismaService) {}
  course = this.prisma.course();

  async getCourse(name: string) {
    const res = await this.course.findUnique({
      where: {
        name,
      },
    });
    return res;
  }
  async createCourse(req: Request) {
    console.log(req.user);
    return 1;
  }
}
