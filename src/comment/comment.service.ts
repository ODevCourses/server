import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) {}
  comment = this.prisma.comment();

  getComment(id: string) {
    return this.comment.findUnique({
      where: {
        id,
      },
    });
  }

  createComment(
    comment: { description: string; lessonId: string },
    user: User,
  ) {
    return this.comment.create({
      data: {
        ...comment,
        authorId: user.id,
      },
    });
  }

  async deleteComment(id: string, user: User) {
    const comment = await this.comment.findUnique({
      where: {
        id,
      },
    });
    if (comment === null) return { msg: 'comment' };
    if (comment.authorId !== user.id) return { msg: 'user' };

    return this.comment.delete({
      where: {
        id,
      },
    });
  }
}
