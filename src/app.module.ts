import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
// import { AuthModule } from './module/auth/auth.module';
import { TenantModule } from './module/tenant/tenant.module';
import { LandlordModule } from './module/landlord/landlord.module';
import { ListingModule } from './module/listing/listing.module';
import { UploadModule } from './module/upload/upload.module';
import { OrderModule } from './module/order/order.module';
import { ContractModule } from './module/contract/contract.module';
import { ReviewModule } from './module/review/review.module';
import { RatingModule } from './module/rating/rating.module';
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
    ContractModule,
    ReviewModule,
    RatingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
