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
  //删除评论
  @Post('delete_review/:id')
  deleteReview(@Param('id') id: string) {
    return this.reviewService.deleteReview(id);
  }
  //修改评论
  @Post('update_review/:id')
  updateReview(@Param('id') id: string, @Body() body: any) {
    return this.reviewService.updateReview(id, body);
  }

  //获取评论列表
  @Get('get_review_list')
  getReviewList() {
    return this.reviewService.getReviewList();
  }
}
