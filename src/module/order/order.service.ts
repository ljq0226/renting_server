import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Error, getPreviousMonths } from 'src/lib';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async create(dto: any) {
    const { tenantName } = dto;
    const tenant = await this.prisma.tenant.findFirst({
      where: {
        username: tenantName,
      },
      select: {
        id: true,
      },
    });
    if (!tenant) {
      Error(400, '无用户名为' + tenantName + '的租户');
    }
    const newOrder = await this.prisma.order.create({
      data: {
        ...dto,
        tenantId: tenant.id,
      },
    });
    return await this.prisma.order.findUnique({
      where: {
        id: newOrder.id,
      },
      include: {
        listing: true,
      },
    });
  }
  //获取所有订单
  async getAll() {
    const arr = await this.prisma.order.findMany({
      include: {
        listing: true,
      },
      orderBy: {
        createdTime: 'desc',
      },
    });
    return { arr };
  }
  //获取房东的订单
  async getLandlordOrder(id: string) {
    const arr = await this.prisma.order.findMany({
      where: {
        landlordId: id,
      },
      include: {
        listing: true,
      },
      orderBy: {
        createdTime: 'desc',
      },
    });
    return { arr };
  }
  //获取用户订单
  async getUserOrder(id: string) {
    const arr = await this.prisma.order.findMany({
      where: {
        tenantId: id,
      },
      include: {
        listing: true,
      },
      orderBy: {
        createdTime: 'desc',
      },
    });
    return { arr };
  }
  //取消订单
  async cancelOrder(id: string) {
    const order = await this.prisma.order.update({
      where: {
        id,
      },
      data: {
        status: 2,
      },
    });
    if (!order) {
      Error(400, '无此订单');
    }
    if (order.status == 2) {
      Error(400, '订单已取消');
    }
  }
  //确认已支付订单
  async confirmOrder(id: string) {
    const order = await this.prisma.order.update({
      where: {
        id,
      },
      data: {
        status: 1,
      },
    });
    if (!order) {
      Error(400, '无此订单');
    }
    if (order.status == 1) {
      Error(400, '订单已支付');
    }
  }
  //更新订单
  async updateOrder(id: string, dto: any) {
    const order = await this.prisma.order.update({
      where: {
        id,
      },
      data: {
        ...dto,
      },
    });
    const status = dto?.status;
    if (status == 1) {
      await this.prisma.listing.update({
        where: {
          id: order.listingId,
        },
        data: {
          status: 1,
        },
      });
    }

    if (!order) {
      Error(400, '无此订单');
    }
    return order;
  }
  //删除订单
  async deleteOrder(id: string) {
    const order = await this.prisma.order.delete({
      where: {
        id,
      },
    });
    if (!order) {
      Error(400, '无此订单');
    }
    return order;
  }
  //订单数据
  async getOrderData(id: string) {
    const ordersPrice = await this.prisma.order.findMany({
      where: {
        landlordId: id,
        status: 1,
      },
      select: {
        totalPrice: true,
        createdTime: true,
      },
    });
    const allPrice = ordersPrice.reduce((acc, cur) => {
      return acc + cur.totalPrice;
    }, 0);
    const listingsCount2 = ordersPrice?.length;
    const commentsCount = await this.prisma.review.count({
      where: {
        landlordId: id,
      },
    });
    //获取现在的月份
    const now = new Date();
    const arr = getPreviousMonths(`${now.getFullYear()}-${now.getMonth() + 1}`);
    const chartData = arr.map((item) => {
      return {
        date: item,
        count: 0,
      };
    });
    ordersPrice.forEach((item) => {
      const date = item.createdTime.toISOString().slice(0, 7);
      const index = chartData.findIndex((item) => item.date === date);
      if (index !== -1) {
        chartData[index].count += item.totalPrice;
      }
    });
    const listingsCount = await this.prisma.listing.count({
      where: {
        landlordId: id,
      },
    });
    return {
      allPrice,
      listingsCount,
      listingsCount2,
      commentsCount,
      chartData,
    };
  }

  async getOrderData2() {
    const ordersPrice = await this.prisma.order.findMany({
      where: {
        status: 1,
      },
      select: {
        totalPrice: true,
        createdTime: true,
      },
    });
    const allPrice = ordersPrice.reduce((acc, cur) => {
      return acc + cur.totalPrice;
    }, 0);
    const listingsCount2 = ordersPrice?.length;
    const commentsCount = await this.prisma.review.count();
    //获取现在的月份
    const now = new Date();
    const arr = getPreviousMonths(`${now.getFullYear()}-${now.getMonth() + 1}`);
    const chartData = arr.map((item) => {
      return {
        date: item,
        count: 0,
      };
    });
    ordersPrice.forEach((item) => {
      const date = item.createdTime.toISOString().slice(0, 7);
      const index = chartData.findIndex((item) => item.date === date);
      if (index !== -1) {
        chartData[index].count += item.totalPrice;
      }
    });
    const listingsCount = await this.prisma.listing.count();
    return {
      allPrice,
      listingsCount,
      listingsCount2,
      commentsCount,
      chartData,
    };
  }
}
