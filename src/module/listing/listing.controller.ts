import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ListingService } from './listing.service';

@Controller('listing')
export class ListingController {
  constructor(private readonly listingService: ListingService) {}

  @Post('add_listing')
  create(@Body() dto: any) {
    return this.listingService.create(dto);
  }
  @Post('update_listing')
  update(@Body() dto: any) {
    return this.listingService.update(dto);
  }
  @Get('getall_listing_byid/:id')
  findAllById(@Param('id') id: string) {
    return this.listingService.findAllById(id);
  }
  @Get('getall_listing')
  findAll() {
    return this.listingService.findAll();
  }
  //获取所有待审核房源
  @Get('getall_uncheck_listing')
  findAllUncheck() {
    return this.listingService.findAllUncheck();
  }
  //审查房源
  @Post('check_listing')
  check(@Body() dto: { id: string; isSuccess: boolean }) {
    return this.listingService.checkListing(dto);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.listingService.findOne(+id);
  }
  @Post('delete_listing/:id')
  remove(@Param('id') id: string) {
    return this.listingService.remove(id);
  }
}
