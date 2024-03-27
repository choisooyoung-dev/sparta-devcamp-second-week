import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { LoginResDto } from '../dto';
import { UserRepository } from './../../user/repositories/user.repository';
import { TokenPayload } from 'src/types';
import { v4 as uuidv4 } from 'uuid';
import { User } from 'src/user/entities';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    @InjectRedis() private readonly redis: Redis,
  ) {}
  async login(email: string, plainPassword: string): Promise<LoginResDto> {
    const user = await this.validateUser(email, plainPassword);
    const payload: TokenPayload = this.createTokenPayload(user.id);
    const [accessToken, refreshToken] = await Promise.all([
      `Bearer ${this.jwtService.sign(payload)}`,
      `Bearer ${this.jwtService.sign(payload, {
        expiresIn: this.configService.get<string>('REFRESH_TOKEN_EXPIRY'),
      })}`,
    ]);

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    };
  }

  createTokenPayload(userId: string): TokenPayload {
    return {
      sub: userId,
      iat: Math.floor(Date.now() / 1000),
      jti: uuidv4(),
    };
  }

  private async validateUser(
    email: string,
    plainPassword: string,
  ): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (user && (await argon2.verify(user.password, plainPassword))) {
      return user;
    }
    throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
  }
}
