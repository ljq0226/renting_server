import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class ListingService {
  constructor(private prisma: PrismaService) {}
  async create(dto: any) {
    const newListing = await this.prisma.listing.create({
      data: {
        ...dto,
      },
    });
    console.log('newListing', newListing);
    return 'This action adds a new listing';
  }

  findAll() {
    return `This action returns all listing`;
  }

  findOne(id: number) {
    return `This action returns a #${id} listing`;
  }

  remove(id: number) {
    return `This action removes a #${id} listing`;
  }
}
