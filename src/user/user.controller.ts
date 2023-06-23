import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';
import { User } from '@prisma/client';
import { IUserLogIn } from 'dto/user';

@Controller('user')
export class UserController {
  constructor(private readonly user: UserService) {}

  @Get(':name')
  getUser(@Param('name') name: string) {
    return this.user.getUser(name);
  }

  @Post()
  async createUser(@Body() body, @Res() res: Response) {
    const result = await this.user.createUser(body);
    if (result === undefined)
      throw new HttpException(
        'Something wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    if ('msg' in result) {
      throw new HttpException(result, HttpStatus.CONFLICT);
    }
    res.json(result);
  }

  @Post('/login')
  logIn(@Body() body: IUserLogIn) {
    return this.user.logIn(body);
  }

  @Put()
  updateUser(@Body() body) {
    return body;
  }
  @Delete()
  async deleteUser(@Body() body, @Res() response: Response) {
    const res: User | { msg: string; code: number } =
      await this.user.deleteUser(body);
    if ('msg' in res) {
      response.status(res.code).json(res);
    }
    return response.status(204);
  }
}
