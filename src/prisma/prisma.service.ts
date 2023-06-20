import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

@Injectable()
export class PrismaService {
  prisma() {
    return prisma;
  }
  user() {
    return prisma.user;
  }
  course() {
    return prisma.course;
  }
  lesson() {
    return prisma.lesson;
  }
  comment() {
    return prisma.comment;
  }
  rate() {
    return prisma.rate;
  }
}
