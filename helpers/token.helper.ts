import { env } from 'process';
import { User } from '@prisma/client';
// import jwt from 'jsonwebtoken';
const jwt = require('jsonwebtoken'); // same here

export function generate(user: User) {
  return {
    user: { ...user, password: undefined, email: undefined },
    token: jwt.sign(user, env.HASH),
  };
}

export function verify(token: string) {
  const user = jwt.verify(token, env.HASH);
  delete user.password;
  delete user.email;
  return user;
}

export default { generate, verify };
