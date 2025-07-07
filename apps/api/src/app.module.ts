import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { JwtAuthGuard } from './auth/guards/auth.guard';
import { UserModule } from './user/user.module';
import { CoursesModule } from './courses/courses.module';
import { AdminGuard } from './auth/guards/admin.guard';
import { StorageModule } from './storage/storage.module';
import { OrderModule } from './order/order.module';
import { PaymentModule } from './payment/payment.module';
import { NotificationModule } from './notification/notification.module';
import { QueueModule } from './queue/queue.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../../.env',
    }),
    AuthModule,
    UserModule,
    CoursesModule,
    StorageModule,
    OrderModule,
    PaymentModule,
    NotificationModule,
    QueueModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'APP_GUARD',
      useClass: JwtAuthGuard,
    },
    {
      provide: 'APP_GUARD',
      useClass: AdminGuard,
    },
  ],
})
export class AppModule {}
