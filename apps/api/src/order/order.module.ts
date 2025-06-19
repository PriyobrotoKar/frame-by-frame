import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { ConfigModule } from '@nestjs/config';
import razorpayConfig from './config/razorpay.config';

@Module({
  imports: [ConfigModule.forFeature(razorpayConfig)],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
