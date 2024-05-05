import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
// import { Error } from 'src/lib';
@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) {}
  //发表评论
  async create(dto: any) {
    const { rating, ...rest } = dto;
    const { listingId } = rest;
    const allScore: any = Object.values(rating).reduce(
      (acc, cur): any => +acc + +cur,
      0,
    );
    const totalScore = Number(
      (allScore / Object.keys(rating).length).toFixed(1),
    );
    const newRating = await this.prisma.rating.create({
      data: {
        ...rating,
        listingId,
        totalScore,
      },
    });
    const newReview = await this.prisma.review.create({
      data: {
        ...rest,
        ratingId: newRating.id,
      },
    });
    return newReview;
  }
  //getReviewByListingId
  async getReviewById(id: string) {
    const arr = await this.prisma.review.findMany({
      where: {
        listingId: id,
      },
      include: {
        rating: true,
        Tenant: true,
      },
    });
    return { arr };
  }

  findAll() {
    return `This action returns all review`;
  }

  findOne(id: number) {
    return `This action returns a #${id} review`;
  }

  remove(id: number) {
    return `This action removes a #${id} review`;
  }
}
