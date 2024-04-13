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
  @Get('getall_listing')
  findAll() {
    return this.listingService.findAll();
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
