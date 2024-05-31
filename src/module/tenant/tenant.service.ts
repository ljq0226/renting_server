import { Injectable } from '@nestjs/common';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { PrismaService } from 'nestjs-prisma';
import { Error } from 'src/lib';
@Injectable()
export class TenantService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<any> {
    const arr = await this.prisma.tenant.findMany();
    return { arr };
  }
  async findAllById(id: string): Promise<any> {
    //id 为房东 id ，找到所有合同下 房东 id 为 id的租户 id,更具这些 id 返回所有租户信息数组 arr
    const tenantIds = await this.prisma.contract.findMany({
      where: {
        landlordId: id,
      },
      select: {
        tenantId: true,
      },
    });
    const arr = await this.prisma.tenant.findMany({
      where: {
        id: {
          in: tenantIds.map((item) => item.tenantId),
        },
      },
    });
    return { arr };
  }
  async login({ username, password }: CreateTenantDto) {
    const res = await this.prisma.tenant.findFirst({
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
    const user = await this.prisma.tenant.findFirst({
      where: {
        username,
      },
    });
    if (user) {
      Error(400, '用户名已存在');
    }
    const newuser = await this.prisma.tenant.create({
      data: {
        username,
        password,
      },
    });
    return { ...newuser, password: '' };
  }
  // 获取所有租户
  async getAllTenant() {
    const res = await this.prisma.tenant.findMany();
    return res;
  }
  async findOne(id: string) {
    const res = await this.prisma.tenant.findUnique({
      where: {
        id,
      },
    });
    return res;
  }
  async update(id: string, data: CreateTenantDto) {
    const res = await this.prisma.tenant.update({
      where: {
        id,
      },
      data,
    });
    return res;
  }
  async remove(id: string) {
    const res = await this.prisma.tenant.delete({
      where: {
        id,
      },
    });
    return res;
  }
  async getTenantByUsername(username: string) {
    const res = await this.prisma.tenant.findFirst({
      where: {
        username,
      },
    });
    return res;
  }
  //updateTenant
  async updateTenant(id: string, data: any) {
    const res = await this.prisma.tenant.update({
      where: {
        id,
      },
      data,
    });
    return res;
  }
}
