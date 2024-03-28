import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { Coupon } from '../entities';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { CreateCouponDto } from '../dto';

@Injectable()
export class CouponRepository extends Repository<Coupon> {
  constructor(
    @InjectRepository(Coupon)
    private readonly repo: Repository<Coupon>,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {
    super(repo.target, repo.manager, repo.queryRunner);
  }

  createCoupon(dto: CreateCouponDto): Promise<Coupon> {
    const coupon = new Coupon();
    coupon.name = dto.name;
    coupon.price = dto.price;
    coupon.type = dto.type;
    return this.repo.save(coupon);
  }
}
