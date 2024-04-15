import { Injectable } from '@nestjs/common';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { PrismaService } from 'nestjs-prisma';
import { Error } from 'src/lib';
@Injectable()
export class TenantService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<any> {
    const res = await this.prisma.tenant.findMany();
    console.log('res', res);
    return res;
  }
  async login({ username, password }: CreateTenantDto) {
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
  async register({ username, password }: CreateTenantDto): Promise<any> {
    const user = await this.prisma.landlord.findFirst({
      where: {
        username,
      },
    });
    if (user) {
      Error(400, '用户名已存在');
    }
    const newuser = await this.prisma.landlord.create({
      data: {
        username,
        password,
      },
    });
    return { ...newuser, password: '' };
  }
}
