import { BaseEntity } from 'src/common/entity';
import { Column } from 'typeorm';

export type UserRole = 'admin' | 'user';

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
}
