import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { env } from 'process';
import { IUserCreate, IUserLogIn } from 'dto/user';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';
import token from 'helpers/token.helper';
const bcrypt = require('bcrypt'); // idk why, but importing doesn't work :(

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
  getFullUser(query: string) {
    if (!query.includes('@')) {
      return this.user.findUnique({
        where: {
          name: query,
        },
      });
    } else {
      return this.user.findUnique({
        where: {
          email: query,
        },
      });
    }
  }
  async createUser(user: IUserCreate) {
    try {
      const passwd = await bcrypt.hashSync(user.password, env.HASH);
      const res = await this.user.create({
        data: { id: uuidv4(), ...user, password: passwd },
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

  async logIn(body: IUserLogIn) {
    const user = await this.getFullUser(body.email);
    const passwd = await bcrypt.hashSync(body.password, env.HASH);
    if (user.password === passwd) {
      return token.generate(user);
    } else {
      throw new HttpException('Wrong password', HttpStatus.FORBIDDEN);
    }
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
        throw new HttpException('Wrong password', HttpStatus.FORBIDDEN);
      }
    } else {
      throw new HttpException("We couldn't find account", HttpStatus.NOT_FOUND);
      return { msg: "We couldn't find account", code: 404 };
    }
  }
}
