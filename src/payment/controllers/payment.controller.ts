import { Controller, Get, Res, Post, Body } from '@nestjs/common';
import { Response } from 'express';
import path from 'path';
import { tossPaymentDTO } from '../dto';
import { PaymentService } from '../services';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get('success')
  success(@Res() res: Response): void {
    res.sendFile(path.join(__dirname, '..', 'public', 'success.html'));
  }

  @Post('toss')
  tossPayment(@Body() dto: tossPaymentDTO) {
    return this.paymentService.tossPayment(dto);
  }
}
