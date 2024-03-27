import { BaseEntity } from 'src/common/entity';
import { Coupon } from 'src/coupon/entities';
import { Point } from 'src/point/entities';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

export type UserRole = 'admin' | 'user';

@Entity()
export class User extends BaseEntity {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar', length: 50 })
  phone: string;

  @Column({ type: 'varchar', length: 50 })
  role: UserRole;

  @OneToOne(() => Point)
  @JoinColumn()
  point: Point;

  @OneToMany(() => Coupon, (coupon) => coupon.user)
  coupons: Coupon[];
}
