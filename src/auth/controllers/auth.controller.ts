import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginReqDto, LoginResDto } from '../dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Get()
  // async getHello() {
  //   await this.redis.set('key', 'Redis data!');
  //   const redisData = await this.redis.get('key');
  //   return { redisData };
  // }

  @Post('login')
  login(@Req() req, @Body() loginReqDto: LoginReqDto): Promise<LoginResDto> {
    console.log(req.cookies);
    return this.authService.login(loginReqDto.email, loginReqDto.password);
  }
}
