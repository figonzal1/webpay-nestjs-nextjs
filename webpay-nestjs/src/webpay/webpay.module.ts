import { Module } from '@nestjs/common';
import { WebpayService } from './webpay.service';
import { WebpayController } from './webpay.controller';

@Module({
  controllers: [WebpayController],
  providers: [WebpayService],
})
export class WebpayModule {}
