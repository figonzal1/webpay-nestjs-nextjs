import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebpayModule } from './webpay/webpay.module';

@Module({
  imports: [WebpayModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
