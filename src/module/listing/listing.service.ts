import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class ListingService {
  constructor(private prisma: PrismaService) {}

  async update(dto: any) {
    const {
      id,
      price,
      status,
      rentType,
      roomCount,
      bathroomCount,
      livingroomCount,
      area,
      floor,
      buildYear,
    } = dto;
    await this.prisma.listing.update({
      where: {
        id,
      },
      data: {
        ...dto,
        price: +price,
        status: +status,
        rentType: +rentType,
        roomCount: +roomCount,
        bathroomCount: +bathroomCount,
        livingroomCount: +livingroomCount,
        area: +area,
        floor: +floor,
        buildYear: +buildYear,
      },
    });
    return true;
  }

  async create(dto: any) {
    const {
      price,
      status,
      rentType,
      roomCount,
      bathroomCount,
      livingroomCount,
      area,
      floor,
      buildYear,
    } = dto;
    await this.prisma.listing.create({
      data: {
        ...dto,
        price: +price,
        status: +status,
        rentType: +rentType,
        roomCount: +roomCount,
        bathroomCount: +bathroomCount,
        livingroomCount: +livingroomCount,
        area: +area,
        floor: +floor,
        buildYear: +buildYear,
      },
    });
    return true;
  }

  async findAll() {
    const allListing = await this.prisma.listing.findMany();
    return { arr: allListing };
  }

  findOne(id: number) {
    return `This action returns a #${id} listing`;
  }

  async remove(id: string) {
    console.log('id', id);
    await this.prisma.listing.delete({
      where: {
        id: id,
      },
    });
    return true;
  }
}
