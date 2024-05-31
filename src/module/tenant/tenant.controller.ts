import { Controller, Get, Post, Body, Param } from '@nestjs/common';
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
  //更新租户信息
  @Post('update_tenant/:id')
  updateTenant(@Param('id') id: string, @Body() dto: any) {
    return this.tenantService.updateTenant(id, dto);
  }

  //获取所有租客信息
  @Get('getall_tenant_admin')
  findAll() {
    return this.tenantService.findAll();
  }
  @Get('getall_tenant/:id')
  findAll2(@Param('id') id: string) {
    return this.tenantService.findAllById(id);
  }
  //获取单个房东信息
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tenantService.findOne(id);
  }
  //修改房东信息
  @Post('update_tenant/:id')
  update(@Param('id') id: string, @Body() updateLandlordDto: any) {
    return this.tenantService.update(id, updateLandlordDto);
  }
  //删除房东信息
  @Post('delete_tenant/:id')
  remove(@Param('id') id: string) {
    return this.tenantService.remove(id);
  }
}
