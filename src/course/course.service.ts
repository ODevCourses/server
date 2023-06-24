import { Injectable } from '@nestjs/common';
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
  async createCourse(
    user,
    body: { avatar: string; name: string; description: string },
  ) {
    return this.course.create({
      data: {
        ...body,
        authorId: user.id,
      },
    });
  }
  async deleteCourse(id: string) {
    return this.course.delete({
      where: {
        id,
      },
    });
  }
}
