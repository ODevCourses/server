import { Injectable } from '@nestjs/common';
import { RateScore, RateType } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RateService {
  constructor(private readonly prisma: PrismaService) {}
  rate = this.prisma.rate();

  getRate(score: RateScore, type: RateType, authorId: string, id: string) {
    return this.rate.findUnique({
      where: {
        score_type_authorId_id: {
          score,
          type,
          authorId,
          id,
        },
      },
    });
  }

  createRate(score: RateScore, type: RateType, authorId: string, id: string) {
    return this.rate.create({
      data: {
        score,
        type,
        authorId,
        id,
      },
    });
  }
}
