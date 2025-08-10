import { db } from '@frame-by-frame/db';
import { startOfDay, startOfMonth } from 'date-fns';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { validateWebhookSignature } from 'razorpay/dist/utils/razorpay-utils';

@Injectable()
export class PaymentService {
  private logger: Logger;
  constructor(private readonly ConfigService: ConfigService) {
    this.logger = new Logger(PaymentService.name);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async handleWebhook(body: any, signature: string) {
    this.logger.log('Received webhook event', body);

    const secret = this.ConfigService.get<string>('RAZORPAY_WEBHOOK_SECRET');

    //validate signature
    const isValidSignature = validateWebhookSignature(
      JSON.stringify(body),
      signature,
      secret,
    );

    if (!isValidSignature) {
      throw new BadRequestException('Invalid signature');
    }

    const { event, payload } = body;
    const { payment } = payload;

    switch (event) {
      case 'payment.authorized':
        await this.handlePaymentAuthorized(
          payment.entity.id,
          payment.entity.order_id,
          payment.entity.method,
        );
        break;
      case 'payment.failed':
        // Handle payment failed event
        await this.handlePaymentFailed(
          payment.entity.id,
          payment.entity.order_id,
        );
        break;
      case 'payment.captured':
        // Handle payment captured event
        await this.handlePaymentCaptured(
          payment.entity.id,
          payment.entity.order_id,
          payment.entity.contact,
        );
        break;
      default:
        throw new BadRequestException('Unhandled event type');
    }
  }

  async handlePaymentAuthorized(
    paymentId: string,
    orderId: string,
    method: string,
  ) {
    // check if order exists
    const order = await db.order.findUnique({
      where: {
        orderId: orderId,
      },
    });

    if (!order) {
      throw new BadRequestException('Order not found');
    }

    // update payment status
    await db.payment.create({
      data: {
        paymentId,
        orderId: order.id,
        amount: order.amount,
        paymentMethod: method,
        status: 'AUTHORIZED',
      },
    });

    this.logger.log(
      `Payment authorized for order ${orderId} with payment ID ${paymentId}`,
    );

    return {
      message: 'Payment authorized successfully',
    };
  }

  async handlePaymentFailed(paymentId: string, orderId: string) {
    // check if order exists
    const order = await db.order.findUnique({
      where: {
        orderId: orderId,
      },
    });

    if (!order) {
      throw new BadRequestException('Order not found');
    }

    // update payment status
    await db.payment.update({
      where: {
        paymentId,
        orderId: order.id,
      },
      data: {
        status: 'FAILED',
      },
    });

    // update the order status
    await db.order.update({
      where: {
        orderId: orderId,
      },
      data: {
        status: 'FAILED',
      },
    });

    this.logger.log(
      `Payment failed for order ${orderId} with payment ID ${paymentId}`,
    );

    return {
      message: 'Payment failed successfully',
    };
  }

  async handlePaymentCaptured(
    paymentId: string,
    orderId: string,
    contact?: string,
  ) {
    // check if order exists
    const order = await db.order.findUnique({
      where: {
        orderId: orderId,
      },
    });

    if (!order) {
      throw new BadRequestException('Order not found');
    }

    // update payment status
    await db.payment.update({
      where: {
        paymentId,
        orderId: order.id,
      },
      data: {
        status: 'SUCCESS',
      },
    });

    // update the order status
    await db.order.update({
      where: {
        orderId: orderId,
      },
      data: {
        status: 'COMPLETED',
      },
    });

    // update the user phone no.
    await db.user.update({
      where: {
        id: order.userId,
      },
      data: {
        phone: contact,
      },
    });

    // update course analytics
    const startingDateOfMonth = startOfMonth(new Date());
    const currentDate = startOfDay(new Date());

    const analytics = await db.course.findUnique({
      where: {
        id: order.courseId,
      },
      select: {
        monthlyAnalytics: {
          where: {
            createdAt: startingDateOfMonth,
          },
        },
        dailyAnalytics: {
          where: {
            createdAt: currentDate,
          },
        },
      },
    });

    const currentLifetimeSales = await db.monthlyAnalytics.aggregate({
      _sum: {
        totalSales: true,
      },
      where: {
        courseId: order.courseId,
      },
    });

    // update course analytics
    await db.monthlyAnalytics.upsert({
      where: {
        id: analytics.monthlyAnalytics[0]?.id || '',
      },
      update: {
        totalSales: {
          increment: order.amount,
        },
        monthlySales: {
          increment: order.amount,
        },
        totalOrders: {
          increment: 1,
        },
      },
      create: {
        courseId: order.courseId,
        totalSales: (currentLifetimeSales._sum.totalSales || 0) + order.amount,
        monthlySales: order.amount,
        totalOrders: 1,
        createdAt: startingDateOfMonth,
      },
    });

    await db.dailyAnalytics.upsert({
      where: {
        id: analytics.dailyAnalytics[0]?.id || '',
      },
      update: {
        totalSales: {
          increment: order.amount,
        },
      },
      create: {
        courseId: order.courseId,
        totalSales: order.amount,
        createdAt: currentDate,
      },
    });

    this.logger.log(
      `Payment captured for order ${orderId} with payment ID ${paymentId}`,
    );

    return {
      message: 'Payment captured successfully',
    };
  }
}
