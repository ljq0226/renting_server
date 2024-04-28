import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
// import { AuthModule } from './module/auth/auth.module';
import { TenantModule } from './module/tenant/tenant.module';
import { LandlordModule } from './module/landlord/landlord.module';
import { ListingModule } from './module/listing/listing.module';
import { UploadModule } from './module/upload/upload.module';
import { OrderModule } from './module/order/order.module';
@Module({
  imports: [
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {},
    }),
    // AuthModule,
    TenantModule,
    LandlordModule,
    ListingModule,
    UploadModule,
    OrderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
