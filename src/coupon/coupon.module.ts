import { Module } from '@nestjs/common';
import { CouponService } from './services/coupon.service';
import { CouponController } from './coupon.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coupon } from './entities';
import { CouponRepository } from './repositories/coupon.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Coupon])],
  controllers: [CouponController],
  providers: [CouponService, CouponRepository],
  exports: [CouponService, CouponRepository],
})
export class CouponModule {}
