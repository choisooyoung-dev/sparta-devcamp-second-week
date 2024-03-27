import { Module } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CouponController } from './coupon.controller';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([User])],
  controllers: [CouponController],
  providers: [CouponService],
})
export class CouponModule {}
