import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Error } from 'src/lib';
@Injectable()
export class ContractService {
  constructor(private prisma: PrismaService) {}
  async create(dto: any) {
    //检查是否合同已经存在
    const existContract = await this.prisma.contract.findFirst({
      where: {
        orderId: dto.orderId,
      },
    });
    if (existContract) {
      Error(400, '合同已经存在');
    }
    const newContract = await this.prisma.contract.create({
      data: {
        ...dto,
      },
    });
    const contractId = newContract.id;
    await this.prisma.order.update({
      where: {
        id: dto.orderId,
      },
      data: {
        contractId,
      },
    });
    return newContract;
  }

  findAll() {
    return `This action returns all contract`;
  }

  async findOne(id: string) {
    return await this.prisma.contract.findFirst({
      where: {
        id,
      },
    });
  }
  //getAllContract
  async getAllContract() {
    const arr = await this.prisma.contract.findMany();
    return { arr };
  }

  async findByLandlord(landlordId: string) {
    const arr = await this.prisma.contract.findMany({
      where: {
        landlordId,
      },
    });
    return { arr };
  }
  async findByTenantId(tenantId: string) {
    const arr = await this.prisma.contract.findMany({
      where: {
        tenantId,
      },
    });
    return { arr };
  }
  remove(id: number) {
    return `This action removes a #${id} contract`;
  }
  // 更新合同
  async updateContract(id: string, dto: any) {
    const contract = await this.prisma.contract.update({
      where: {
        id,
      },
      data: {
        ...dto,
      },
    });
    if (!contract) {
      Error(400, '无此合同');
    }
    return contract;
  }
}
