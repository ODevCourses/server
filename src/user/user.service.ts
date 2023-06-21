import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { IUserCreate } from 'src/dto/user';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  user = this.prisma.user();

  getUser(name: string) {
    return this.user.findUnique({
      where: {
        name,
      },
      select: {
        id: true,
        avatar: true,
        name: true,
        createdAt: true,
        isVerefied: true,
        role: true,
      },
    });
  }
  async createUser(user: IUserCreate) {
    try {
      const res = await this.user.create({
        data: { id: uuidv4(), ...user },
        select: {
          id: true,
          avatar: true,
          name: true,
          createdAt: true,
          isVerefied: true,
          role: true,
        },
      });
      return res;
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          return {
            msg: `field '${e.meta.target}' must be unique!`,
            error: 'UsernameRegistered',
          };
        }
      }
      return { msg: e };
    }
  }
}
