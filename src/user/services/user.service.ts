import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '../entities';
import * as argon2 from 'argon2';
import { UserRepository } from '../repositories';
import { CreateUserDto } from '../dto';
import { CouponService } from 'src/coupon/services';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly couponService: CouponService,
  ) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    // 이메일 중복 검사
    const user = await this.userRepo.findOneByEmail(dto.email);
    if (user) {
      throw new HttpException('Already Exist', HttpStatus.BAD_REQUEST);
    }

    // 비밀번호 해싱
    const hashedPassword = await argon2.hash(dto.password);

    return this.userRepo.createUser(dto, hashedPassword);
  }

  // findAll() {
  //   return `This action returns all user`;
  // }

  async findOne(id: string) {
    const user = await this.userRepo.findOneById(id);
    return user;
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
