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
    const admin = await this.prisma.admin.findFirst({
      where: {
        username,
      },
    });
    //如果是管理员
    if (admin) {
      if (password !== admin.password) {
        Error(401, '密码错误');
      }
      return { ...admin, password: '' };
    } else {
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
      return { ...res, password: '' };
    }
  }
  //注册
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
    const user = await this.prisma.landlord.findFirst({
      where: {
        username,
      },
    });
    if (user) {
      Error(400, '用户名已存在');
    }
    const newLandlord = await this.prisma.landlord.create({
      data: {
        username,
        password,
      },
    });
    return { ...newLandlord, password: '' };
  }
  //获取所有房东信息
  async findAll() {
    return await this.prisma.landlord.findMany({
      select: {
        id: true,
        username: true,
        avatar: true,
        phone: true,
        email: true,
        description: true,
        createdAt: true,
      },
    });
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
