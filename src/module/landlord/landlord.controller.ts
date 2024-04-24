import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { LandlordService } from './landlord.service';
import { CreateLandlordDto } from './dto/create-landlord.dto';

@Controller('landlord')
export class LandlordController {
  constructor(private readonly landlordService: LandlordService) {}

  @Post('/register')
  create(@Body() createLandlordDto: CreateLandlordDto) {
    return this.landlordService.create(createLandlordDto);
  }
  @Post('')
  login(@Body() dto: CreateLandlordDto) {
    return this.landlordService.login(dto);
  }
  //获取所有房东信息
  @Get('getall_landlord')
  findAll() {
    return this.landlordService.findAll();
  }
  //获取单个房东信息
  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.landlordService.findOne(id);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateLandlordDto: UpdateLandlordDto,
  // ) {
  //   return this.landlordService.update(+id, updateLandlordDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.landlordService.remove(+id);
  }
}
