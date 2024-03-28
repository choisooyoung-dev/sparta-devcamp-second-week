import {
  Controller,
  // Get,
  Body,
  Post,
  // Patch,
  // Param,
  // Delete,
  // UseGuards,
} from '@nestjs/common';
import { CouponService } from './services/coupon.service';
// import { CreateCouponDto } from './dto/create-coupon.dto';
// import { UpdateCouponDto } from './dto/update-coupon.dto';
import { CreateCouponDto } from './dto';
// import { Role } from 'src/auth/decorators/role.decorator';
// import { RolesGuard } from './../auth/guards/roles.guard';

@Controller('coupon')
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @Post('create')
  // @Role('admin')
  // @UseGuards(RolesGuard)
  create(@Body() dto: CreateCouponDto) {
    return this.couponService.create(dto);
  }

  // @Get()
  // findAll() {
  //   return this.couponService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.couponService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCouponDto: UpdateCouponDto) {
  //   return this.couponService.update(+id, updateCouponDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.couponService.remove(+id);
  // }
}
