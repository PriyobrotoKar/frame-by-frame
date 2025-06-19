import { JwtPayload } from '@/types/jwt.payload';
import { db } from '@frame-by-frame/db';
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { type ConfigType } from '@nestjs/config';
import Razorpay from 'razorpay';
import razorpayConfig from './config/razorpay.config';

@Injectable()
export class OrderService {
  private razorpay: Razorpay;

  constructor(
    @Inject(razorpayConfig.KEY)
    private readonly razorpayConfiguration: ConfigType<typeof razorpayConfig>,
  ) {
    this.razorpay = new Razorpay(this.razorpayConfiguration);
  }

  async createOrder(courseId: string, user: JwtPayload) {
    // check if course exists and is available
    const course = await db.course.findUnique({
      where: {
        id: courseId,
      },
    });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    if (!course.isPublished || !course.price) {
      throw new BadRequestException('Course is not published yet');
    }

    // check if user already bought the course
    const existingOrder = await db.order.findUnique({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId: course.id,
        },
      },
    });

    if (existingOrder && existingOrder.status === 'COMPLETED') {
      throw new BadRequestException('You have already purchased this course');
    }

    const orderOptions = {
      amount: course.price,
      currency: 'INR',
    };

    // create order
    const { id } = await this.razorpay.orders.create(orderOptions);

    await db.order.upsert({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId: course.id,
        },
      },
      update: {
        orderId: id,
        status: 'PENDING',
      },
      create: {
        amount: course.price,
        currency: 'INR',
        courseId: course.id,
        userId: user.id,
        orderId: id,
      },
    });

    return {
      orderId: id,
      amount: course.price,
      currency: 'INR',
    };
  }
}
