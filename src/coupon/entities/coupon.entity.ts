import { BaseEntity } from 'src/common/entity';
import { User } from 'src/user/entities';
import { Column, Entity, ManyToMany } from 'typeorm';

export type couponType = 'percentage' | 'price';

@Entity()
export class Coupon extends BaseEntity {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'varchar', length: 50 })
  type: couponType;

  @ManyToMany(() => User, (user) => user.coupons)
  users: User[];
}
