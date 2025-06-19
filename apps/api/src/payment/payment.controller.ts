import { Body, Controller, Headers, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';
import Public from '@/decorators/public.decorator';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Public()
  @Post('webhook')
  async handleWebhook(
    @Body() body: Body,
    @Headers('x-razorpay-signature') signature: string,
  ) {
    return this.paymentService.handleWebhook(body, signature);
  }
}
