import { Injectable } from '@nestjs/common';
import { IUserCreate } from 'src/dto/user';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  user = this.prisma.user();

  getUser(id: number) {
    return this.user.findUnique({
      where: {
        id: id,
      },
    });
  }
  createUser(user: IUserCreate) {
    return this.user.create({
      data: user,
    });
  }
}
