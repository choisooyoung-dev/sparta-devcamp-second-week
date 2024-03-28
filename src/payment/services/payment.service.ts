import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { tossPaymentDTO } from '../dto';
import axios from 'axios';

@Injectable()
export class PaymentService {
  constructor(private configService: ConfigService) {}

  async tossPayment(dto: tossPaymentDTO) {
    const { orderId, amount, paymentKey } = dto;

    try {
      const res = await axios.post(
        `${this.configService.get<string>('TOSS_URL')}/${paymentKey}`,
        {
          orderId,
          amount,
        },
        {
          headers: {
            Authorization: `Basic ${Buffer.from(`${this.configService.get<string>('TOSS_SECRET_KEY')}:`).toString('base64')}`,
          },
        },
      );
      return {
        title: '결제 성공',
        body: res.data,
      };
    } catch (error) {
      console.log('error');
    }
  }
}
