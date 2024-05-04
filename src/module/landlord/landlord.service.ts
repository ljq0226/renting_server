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
    const arr = await this.prisma.landlord.findMany({
      select: {
        id: true,
        username: true,
        avatar: true,
        phone: true,
        email: true,
        description: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return { arr };
  }

  async findOne(id: string) {
    return await this.prisma.landlord.findUnique({
      where: {
        id,
      },
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
  //修改房东信息
  async update(id: string, { username, phone, email, description }: any) {
    const res = await this.prisma.landlord.update({
      where: {
        id,
      },
      data: {
        username,
        phone,
        email,
        description,
      },
    });
    return { ...res, password: '' };
  }

  remove(id: string) {
    return this.prisma.landlord.delete({
      where: {
        id,
      },
    });
  }

  async updateLandlord(id: string, data: any) {
    const res = await this.prisma.landlord.update({
      where: {
        id,
      },
      data,
    });
    return res;
  }
}
