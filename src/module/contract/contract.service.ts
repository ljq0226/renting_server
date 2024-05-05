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

  findOne(id: number) {
    return `This action returns a #${id} contract`;
  }

  remove(id: number) {
    return `This action removes a #${id} contract`;
  }
}
