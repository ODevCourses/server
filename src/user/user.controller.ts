import { Body, Controller, Get, Param, Post, Put, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';

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
    console.log(result);
    if ('msg' in result) {
      res.status(409).json(result);
    }
    res.json(result);
  }

  @Put()
  updateUser(@Body() body) {
    return body;
  }
}
