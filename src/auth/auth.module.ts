import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from 'src/user/services';
import { UserRepository } from 'src/user/repositories';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies';
import { User } from 'src/user/entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CouponService } from 'src/coupon/services';
import { CouponModule } from 'src/coupon/coupon.module';
import { CouponRepository } from 'src/coupon/repositories/coupon.repository';
import { Coupon } from 'src/coupon/entities';

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configservice: ConfigService) => ({
        secret: configservice.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configservice.get<string>('ACCESS_TOKEN_EXPIRY'),
        },
      }),
    }),
    TypeOrmModule.forFeature([User, Coupon]),
    CouponModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, UserRepository, JwtStrategy],
})
export class AuthModule {}
