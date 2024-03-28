import { Injectable } from '@nestjs/common';
import { User } from '../entities';
import { EntityManager, In, Repository } from 'typeorm';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dto';
import { Coupon } from 'src/coupon/entities';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
    @InjectRepository(Coupon)
    private readonly couponRepo: Repository<Coupon>,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {
    super(repo.target, repo.manager, repo.queryRunner);
  }

  async findOneById(id: string): Promise<User> {
    return this.repo.findOneBy({ id });
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.repo.findOneBy({ email });
  }

  async createUser(dto: CreateUserDto, hashedPassword: string): Promise<User> {
    const user = new User();
    user.name = dto.name;
    user.email = dto.email;
    user.password = hashedPassword;
    user.phone = dto.phone;
    user.role = dto.role;

    if (dto.couponNames) {
      // 쿠폰 이름을 기반으로 쿠폰 엔티티 조회
      const coupons = await this.couponRepo.findBy({
        name: In(dto.couponNames),
      });
      user.coupons = coupons;
    }

    return this.entityManager.save(user);
  }
}
