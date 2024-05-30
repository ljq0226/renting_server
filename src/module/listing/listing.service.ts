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
      orderBy: {
        createdAt: 'desc',
      },
    });
    return { arr: allListing };
  }
  //id的房源
  async findById(id: string) {
    const listing = await this.prisma.listing.findUnique({
      where: {
        id,
      },
    });
    return { listing };
  }
  //根据搜索内容获取 listing
  async findAllBySearch(
    city: string,
    search?: string,
    price?: number,
    rentType?: number,
    roomCount?: number,
    isShortTermRental?: number,
  ) {
    search = decodeURIComponent(search);
    let priceFilter = {};
    if (price < 1000) {
      priceFilter = { lte: 1000 };
    } else if (price > 3000) {
      priceFilter = { gte: 3000 };
    } else {
      priceFilter = { gte: price - 250, lte: price + 250 };
    }
    // 构建查询规则
    const rules: any = [
      {
        isShortTermRental: { equals: isShortTermRental ? true : false },
      },
      {
        city: { equals: city },
      },
    ];
    if (price !== undefined && !Number.isNaN(price)) {
      if (price >= 0) rules.push({ price: priceFilter });
    }
    if (rentType !== undefined && !Number.isNaN(rentType)) {
      if (rentType >= 0) rules.push({ rentType: { equals: rentType } });
    }
    if (roomCount !== undefined && !Number.isNaN(roomCount)) {
      if (roomCount >= 0) {
        if (roomCount < 4) {
          rules.push({ roomCount: { equals: roomCount } });
        } else {
          rules.push({ roomCount: { gte: roomCount } });
        }
      }
    }

    const allListing = await this.prisma.listing.findMany({
      where: {
        AND: [
          {
            OR: [
              {
                title: {
                  contains: search,
                },
              },
              {
                city: {
                  contains: search,
                },
              },
              {
                address: {
                  contains: search,
                },
              },
              {
                keywords: {
                  contains: search,
                },
              },
            ],
          },
          ...rules,
          {
            isChecked: {
              equals: 1,
            },
          },
        ],
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    console.log('allListing', allListing);
    return { arr: allListing };
  }
  //所有房源
  async findAll() {
    const allListing = await this.prisma.listing.findMany({
      // where: {
      //   isChecked: {
      //     equals: 1,
      //   },
      // },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return { arr: allListing };
  }

  //findAllShort
  async findAllShort() {
    const allListing = await this.prisma.listing.findMany({
      where: {
        isShortTermRental: true,
        isChecked: {
          equals: 1,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return { arr: allListing };
  }
  //findAllNotShort
  async findAllNotShort() {
    const allListing = await this.prisma.listing.findMany({
      where: {
        isShortTermRental: false,
        isChecked: {
          equals: 1,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return { arr: allListing };
  }
  //未审核的房源
  async findAllUncheck() {
    const allListing = await this.prisma.listing.findMany({
      where: {
        isChecked: 0,
      },
      orderBy: {
        createdAt: 'desc',
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
    await this.prisma.listing.delete({
      where: {
        id: id,
      },
    });
    return true;
  }
}
