import { Injectable, Logger } from '@nestjs/common';
import { CreateWebpayDto } from './dto/create-webpay.dto';
import { IntegrationApiKeys, IntegrationCommerceCodes, WebpayPlus } from 'transbank-sdk';

@Injectable()
export class WebpayService {
  private readonly logger = new Logger(WebpayService.name);

  private tx = WebpayPlus.Transaction.buildForIntegration(
    IntegrationCommerceCodes.WEBPAY_PLUS,
    IntegrationApiKeys.WEBPAY,
  );

  async createTx(createWebpayDto: CreateWebpayDto) {
    const buyOrder = 'GT-' + Math.floor(Math.random() * 10000) + 1;
    const sessionId = 'Session-' + Math.floor(Math.random() * 10000) + 1;
    const returnUrl = 'http://localhost:3000/webpay/commit';

    this.logger.debug(
      `Creating transaction buyOrder=${buyOrder} sessionId=${sessionId} amount=${createWebpayDto.amount}`,
    );

    const response = await this.tx.create(buyOrder, sessionId, createWebpayDto.amount, returnUrl);

    this.logger.debug(`Transaction created token=${response.token} url=${response.url}`);

    return response;
  }

  async commitTx(tokenWs: string) {
    this.logger.debug(`Committing transaction token=${tokenWs}`);

    const response = await this.tx.commit(tokenWs);

    this.logger.debug(
      `Transaction committed responseCode=${response.response_code} status=${response.status}`,
    );

    return response;
  }

  async statusTx(tokenWs: string) {
    this.logger.debug(`Fetching status for token=${tokenWs}`);

    const response = await this.tx.status(tokenWs);

    this.logger.debug(`Status fetched status=${response.status}`);

    return response;
  }
}
