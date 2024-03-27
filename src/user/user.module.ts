import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities';
import { UserRepository } from './repositories/user.repository';
import { AuthModule } from 'src/auth/auth.module';
import { Point } from 'src/point/entities';
import { Coupon } from 'src/coupon/entities';

@Module({
  imports: [TypeOrmModule.forFeature([User, Point, Coupon]), AuthModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository],
})
export class UserModule {}
