import { Controller, Get, Post, Body } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { CreateTenantDto } from './dto/create-tenant.dto';

@Controller('tenant')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @Post('/register')
  create(@Body() createLandlordDto: CreateTenantDto) {
    return this.tenantService.register(createLandlordDto);
  }
  @Post('')
  login(@Body() dto: CreateTenantDto) {
    return this.tenantService.login(dto);
  }
  @Get()
  findAll() {
    return this.tenantService.findAll();
  }
}
