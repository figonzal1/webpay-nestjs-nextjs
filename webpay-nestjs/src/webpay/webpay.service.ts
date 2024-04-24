import { Injectable } from '@nestjs/common';
import { CreateWebpayDto } from './dto/create-webpay.dto';
import {
  Environment,
  IntegrationApiKeys,
  IntegrationCommerceCodes,
  Options,
  WebpayPlus,
} from 'transbank-sdk';

@Injectable()
export class WebpayService {
  private tx = new WebpayPlus.Transaction(
    new Options(
      IntegrationCommerceCodes.WEBPAY_PLUS,
      IntegrationApiKeys.WEBPAY,
      Environment.Integration,
    ),
  );

  async createTx(createWebpayDto: CreateWebpayDto) {
    console.log(createWebpayDto);
    const buyOrder = 'GT-' + Math.floor(Math.random() * 10000) + 1;
    const sessionId = 'Session-' + Math.floor(Math.random() * 10000) + 1;
    const returnUrl = 'http://localhost:3000/webpay/commit';

    const response = await this.tx.create(
      buyOrder,
      sessionId,
      createWebpayDto.amount,
      returnUrl,
    );

    return response;
  }

  async commitTx(tokenWs: string) {
    return await this.tx.commit(tokenWs);
  }

  async statusTx(tokenWs: string) {
    return await this.tx.status(tokenWs);
  }
}
