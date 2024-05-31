import { OrderService } from './order.service';
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  //获取所有订单
  @Get('/get_all_order')
  getAll() {
    return this.orderService.getAll();
  }
  //获取房东的订单
  @Get('/get_landlord_order/:id')
  getLandlordOrder(@Param('id') id: string) {
    return this.orderService.getLandlordOrder(id);
  }
  //创建订单
  @Post('/create_order')
  create(@Body() dto: any) {
    return this.orderService.create(dto);
  }
  //获取用户订单
  @Get('/get_user_order/:id')
  getUserOrder(@Param('id') id: string) {
    return this.orderService.getUserOrder(id);
  }
  //取消订单
  @Post('/cancel_order/:id')
  cancel(@Param('id') id: string) {
    return this.orderService.cancelOrder(id);
  }
  //确认已支付订单
  @Post('/confirm_order/:id')
  confirm(@Param('id') id: string) {
    return this.orderService.confirmOrder(id);
  }
  //更新订单
  @Post('/update_order/:id')
  update(@Param('id') id: string, @Body() dto: any) {
    return this.orderService.updateOrder(id, dto);
  }
  //删除订单
  @Post('/delete_order/:id')
  delete(@Param('id') id: string) {
    return this.orderService.deleteOrder(id);
  }
  //订单数据
  @Get('/get_order_data/:id')
  getOrderData(@Param('id') id: string) {
    return this.orderService.getOrderData(id);
  }
  @Get('/get_order_data_admin')
  getOrderData2() {
    return this.orderService.getOrderData2();
  }
}
