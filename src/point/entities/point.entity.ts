import { BaseEntity } from 'src/common/entity';
import { User } from 'src/user/entities';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity()
export class Point extends BaseEntity {
  @Column({ type: 'int', default: 0 })
  total: number;

  @Column({ type: 'int', default: 0 })
  deposit: number;

  @Column({ type: 'int', default: 0 })
  withdrawal: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
