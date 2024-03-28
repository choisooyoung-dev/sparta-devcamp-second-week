import { BaseEntity } from 'src/common/entity';
import { Coupon } from 'src/coupon/entities';
import { Point } from 'src/point/entities';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
} from 'typeorm';

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

  // 쿠폰 소유자
  @ManyToMany(() => Coupon)
  @JoinTable({
    name: 'user_coupons',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'coupon_id',
      referencedColumnName: 'id',
    },
  })
  coupons: Coupon[];
}
