import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { IUserCreate, IUserLogIn } from 'src/dto/user';
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
  getFullUser(name: string) {
    return this.user.findUnique({
      where: {
        name,
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

  logIn(body: IUserLogIn) {
    return 1;
  }
  async deleteUser(user: { name: string; password: string }) {
    const userData = await this.getFullUser(user.name);
    if (userData !== null) {
      if (user.password === userData.password) {
        return this.user.delete({
          where: {
            id: userData.id,
          },
        });
      } else {
        return { msg: 'Wrong password', code: 403 };
      }
    } else {
      return { msg: "We couldn't find account", code: 404 };
    }
  }
}
