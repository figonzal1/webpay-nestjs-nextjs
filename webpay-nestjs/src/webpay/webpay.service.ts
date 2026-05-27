import { Injectable } from '@nestjs/common';
import { CreateWebpayDto } from './dto/create-webpay.dto';
import { IntegrationApiKeys, IntegrationCommerceCodes, WebpayPlus } from 'transbank-sdk';

@Injectable()
export class WebpayService {
  private tx = WebpayPlus.Transaction.buildForIntegration(
    IntegrationCommerceCodes.WEBPAY_PLUS,
    IntegrationApiKeys.WEBPAY,
  );

  async createTx(createWebpayDto: CreateWebpayDto) {
    const buyOrder = 'GT-' + Math.floor(Math.random() * 10000) + 1;
    const sessionId = 'Session-' + Math.floor(Math.random() * 10000) + 1;
    const returnUrl = 'http://localhost:3000/webpay/commit';

    return await this.tx.create(buyOrder, sessionId, createWebpayDto.amount, returnUrl);
  }

  async commitTx(tokenWs: string) {
    return await this.tx.commit(tokenWs);
  }

  async statusTx(tokenWs: string) {
    return await this.tx.status(tokenWs);
  }
}
