import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class ListingService {
  constructor(private prisma: PrismaService) {}

  async update(dto: any) {
    const {
      id,
      price,
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
    console.log('dto', dto);
    const {
      price,
      rentType,
      roomCount,
      bathroomCount,
      livingroomCount,
      area,
      floor,
      buildYear,
      landlordId,
    } = dto;
    await this.prisma.listing.create({
      data: {
        ...dto,
        price: +price,
        rentType: +rentType,
        roomCount: +roomCount,
        bathroomCount: +bathroomCount,
        livingroomCount: +livingroomCount,
        area: +area,
        floor: +floor,
        buildYear: +buildYear,
        status: 0,
        landlordId,
      },
    });
    return true;
  }
  //id房东的房源
  async findAllById(landlordId: string) {
    const allListing = await this.prisma.listing.findMany({
      where: {
        landlordId,
      },
    });
    return { arr: allListing };
  }
  //所有房源
  async findAll() {
    const allListing = await this.prisma.listing.findMany();
    return { arr: allListing };
  }
  //未审核的房源
  async findAllUncheck() {
    const allListing = await this.prisma.listing.findMany({
      where: {
        isChecked: 0,
      },
    });
    return { arr: allListing };
  }
  //审查房源
  async checkListing({ id, isSuccess }) {
    await this.prisma.listing.update({
      where: {
        id,
      },
      data: {
        isChecked: isSuccess ? 1 : 2,
      },
    });
    return true;
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
