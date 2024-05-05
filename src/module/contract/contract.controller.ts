import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ContractService } from './contract.service';

@Controller('contract')
export class ContractController {
  constructor(private readonly contractService: ContractService) {}

  @Post('create_contract')
  create(@Body() createContractDto: any) {
    return this.contractService.create(createContractDto);
  }

  @Get()
  findAll() {
    return this.contractService.findAll();
  }
  //get_all_contract
  @Get('get_all_contract')
  getAllContract() {
    return this.contractService.getAllContract();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.contractService.findOne(id);
  }
  //根据房东 id 获取合同
  @Get('/landlord/:id')
  findByLandlord(@Param('id') id: string) {
    return this.contractService.findByLandlord(id);
  }
  //根据租户 id 获取合同
  @Get('/tenant/:id')
  findByTenantId(@Param('id') id: string) {
    return this.contractService.findByTenantId(id);
  }
  //更新合同
  @Post('/update_contract/:id')
  update(@Param('id') id: string, @Body() dto: any) {
    return this.contractService.updateContract(id, dto);
  }
}
