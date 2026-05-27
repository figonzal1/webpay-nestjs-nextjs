import { Controller, Get, Logger, Post, Body, Param, Query, Res } from '@nestjs/common';
import { WebpayService } from './webpay.service';
import { CreateWebpayDto } from './dto/create-webpay.dto';
import { Response } from 'express';

@Controller('webpay')
export class WebpayController {
  private readonly logger = new Logger(WebpayController.name);

  constructor(private readonly webpayService: WebpayService) {}

  @Post()
  create(@Body() createWebpayDto: CreateWebpayDto) {
    this.logger.debug(`POST /webpay amount=${createWebpayDto.amount}`);
    return this.webpayService.createTx(createWebpayDto);
  }

  @Get('/commit')
  async callback(@Query('token_ws') tokenWs: string, @Res() res: Response) {
    if (!tokenWs) {
      this.logger.warn('GET /webpay/commit called without token_ws — redirecting to error');
      return res.redirect('http://localhost:4000/result/error');
    }

    this.logger.debug(`GET /webpay/commit token=${tokenWs}`);

    const response = await this.webpayService.commitTx(tokenWs);

    if (response.response_code === 0) {
      this.logger.debug(`Commit successful, redirecting to success`);
      return res.redirect('http://localhost:4000/result/success');
    }

    this.logger.warn(`Commit failed responseCode=${response.response_code}, redirecting to error`);
    return res.redirect('http://localhost:4000/result/error');
  }

  // Transbank envía POST al returnUrl con los parámetros en el body al abortar o timeout
  @Post('/commit')
  failedCallback(
    @Body('TBK_TOKEN') tbkToken: string,
    @Body('TBK_ORDEN_COMPRA') tbkOrdenCompra: string,
    @Body('TBK_ID_SESSION') tbkIdSession: string,
  ) {
    this.logger.warn(
      `POST /webpay/commit (abort/timeout) tbkOrdenCompra=${tbkOrdenCompra} tbkIdSession=${tbkIdSession}`,
    );
    return { tbkToken, tbkOrdenCompra, tbkIdSession };
  }

  @Get('/status/:token_ws')
  status(@Param('token_ws') tokenWs: string) {
    this.logger.debug(`GET /webpay/status token=${tokenWs}`);
    return this.webpayService.statusTx(tokenWs);
  }
}
