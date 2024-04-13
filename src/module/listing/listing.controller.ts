import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ListingService } from './listing.service';

@Controller('listing')
export class ListingController {
  constructor(private readonly listingService: ListingService) {}

  @Post('add_listing')
  create(@Body() dto: any) {
    return this.listingService.create(dto);
  }

  @Get()
  findAll() {
    return this.listingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.listingService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.listingService.remove(+id);
  }
}
