import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ReviewService } from './review.service';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}
  @Post('create_review')
  create(@Body() body: any) {
    return this.reviewService.create(body);
  }
  //根据房源 id获取评论
  @Get('get_review/:id')
  getReview(@Param('id') id: string) {
    return this.reviewService.getReviewById(id);
  }
}
