import { Injectable } from '@nestjs/common';
import { CreateLandlordDto } from './dto/create-landlord.dto';
// import { UpdateLandlordDto } from './dto/update-landlord.dto';
import { PrismaService } from 'nestjs-prisma';
import { UserRole } from '@prisma/client';
import { Error } from 'src/lib';

@Injectable()
export class LandlordService {
  constructor(private prisma: PrismaService) {}
  async login({ username, password }: CreateLandlordDto) {
    const res = await this.prisma.landlord.findFirst({
      where: {
        username,
      },
    });
    if (!res) {
      Error(401, '用户不存在');
    }
    if (password !== res.password) {
      Error(401, '密码错误');
    }
    return true;
  }
  async create({ username, password }: CreateLandlordDto): Promise<{
    id: string;
    username: string;
    password: string;
    avatar: string;
    role: UserRole;
    phone: string;
    email: string;
    description: string;
    createdAt: Date;
  }> {
    const newLandlord = await this.prisma.landlord.create({
      data: {
        username,
        password,
      },
    });
    return newLandlord;
  }

  findAll() {
    return `This action returns all landlord`;
  }

  findOne(id: number) {
    return `This action returns a #${id} landlord`;
  }

  // update(id: number, updateLandlordDto: UpdateLandlordDto) {
  //   return `This action updates a #${id} landlord`;
  // }

  remove(id: number) {
    return `This action removes a #${id} landlord`;
  }
}
