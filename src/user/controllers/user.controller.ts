import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
// import { UpdateUserDto } from '../dto/update-user.dto';
import { SignupResDto } from '../dto/signup-res.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async signup(@Body() createUserDto: CreateUserDto): Promise<SignupResDto> {
    const user = await this.userService.createUser(createUserDto);
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
    };
  }

  // @Get()
  // findAll() {
  //   return this.userService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
