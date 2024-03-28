import { Injectable } from '@nestjs/common';
import { CreateCouponDto } from '../dto/create-coupon.dto';
// import { UpdateCouponDto } from '../dto/update-coupon.dto';
import { CouponRepository } from '../repositories/coupon.repository';
import { Coupon } from '../entities';
import { In } from 'typeorm';

@Injectable()
export class CouponService {
  constructor(private readonly couponRepository: CouponRepository) {}
  async create(dto: CreateCouponDto): Promise<Coupon> {
    return this.couponRepository.createCoupon(dto);
  }

  async findByName(couponNames: string[]): Promise<Coupon[]> {
    const coupons = await this.couponRepository.findBy({
      name: In(couponNames),
    });
    return coupons;
  }

  // findAll() {
  //   return `This action returns all coupon`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} coupon`;
  // }

  // update(id: number, updateCouponDto: UpdateCouponDto) {
  //   return `This action updates a #${id} coupon`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} coupon`;
  // }
}
