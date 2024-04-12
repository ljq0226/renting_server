import { Injectable } from '@nestjs/common';
// import { CreateTenantDto } from './dto/create-tenant.dto';
// import { UpdateTenantDto } from './dto/update-tenant.dto';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class TenantService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<any> {
    const res = await this.prisma.tenant.findMany();
    console.log('res', res);
    return res;
  }
}
