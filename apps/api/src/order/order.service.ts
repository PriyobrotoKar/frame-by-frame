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
      include: {
        versions: true,
      },
    });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    // check if course is published and has a price
    const publisedVersion = course.versions.find(
      (version) => version.isPublished && version.price > 0,
    );

    if (!publisedVersion) {
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
      amount: publisedVersion.price,
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
      },
      create: {
        amount: publisedVersion.price,
        currency: 'INR',
        courseId: course.id,
        userId: user.id,
        orderId: id,
      },
    });

    return {
      orderId: id,
      amount: publisedVersion.price,
      currency: 'INR',
    };
  }

  async getOrders(courseId: string, page: number, limit: number) {
    const orders = await db.order.findMany({
      where: {
        courseId: courseId,
      },
      skip: page * limit,
      take: limit,
      select: {
        id: true,
        amount: true,
        currency: true,
        orderId: true,
        status: true,
        createdAt: true,
        user: {
          select: {
            name: true,
            email: true,
            phone: true,
          },
        },
      },
    });

    const totalOrders = await db.order.count();

    const structuredOrders = orders.map(({ user, ...order }) => {
      return {
        ...order,
        customer_name: user.name,
        customer_email: user.email,
        customer_phone: user.phone,
      };
    });

    return {
      orders: structuredOrders,
      totalOrders,
      page,
      limit,
    };
  }

  async getOrderByCourse(courseId: string, user: JwtPayload) {
    const order = await db.order.findUnique({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId,
        },
      },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }
}
