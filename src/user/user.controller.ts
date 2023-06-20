import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { z } from 'zod';

const userCreate = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
});

@Controller('/user')
export class UserController {
  constructor(private readonly user: UserService) {}

  @Get()
  getUser(@Query('id', ParseIntPipe) id: number) {
    z.number().parse(id);
    return this.user.getUser(id);
  }
}
