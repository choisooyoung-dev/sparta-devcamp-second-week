import { couponType } from '../entities';

export type CreateCouponDto = {
  name: string;
  price: number;
  type: couponType;
};
