import { All, Body, Controller, Get, Logger, Param, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateWebpayDto } from './dto/create-webpay.dto';
import { WebpayService } from './webpay.service';

@Controller('webpay')
export class WebpayController {
  private readonly logger = new Logger(WebpayController.name);

  constructor(private readonly webpayService: WebpayService) {}

  @Post()
  create(@Body() createWebpayDto: CreateWebpayDto) {
    this.logger.debug(`POST /webpay amount=${createWebpayDto.amount}`);
    return this.webpayService.createTx(createWebpayDto);
  }

  @All('/commit')
  async callback(@Req() req: Request, @Res() res: Response) {
    const params = req.method === 'GET' ? req.query : req.body;
    const tokenWs = params['token_ws'] as string;
    const tbkToken = params['TBK_TOKEN'] as string;
    const tbkOrdenCompra = params['TBK_ORDEN_COMPRA'] as string;
    const tbkIdSession = params['TBK_ID_SESSION'] as string;

    // Timeout: Transbank redirige sin ningún token
    if (!tokenWs && !tbkToken) {
      this.logger.warn(
        `[${req.method}] /webpay/commit timeout tbkOrdenCompra=${tbkOrdenCompra} tbkIdSession=${tbkIdSession}`,
      );
      return res.redirect('http://localhost:4000/result/error');
    }

    // Abort: usuario canceló el pago en el formulario de Transbank
    if (tbkToken && !tokenWs) {
      this.logger.warn(
        `[${req.method}] /webpay/commit abort tbkToken=${tbkToken} tbkOrdenCompra=${tbkOrdenCompra}`,
      );
      return res.redirect('http://localhost:4000/result/error');
    }

    // Éxito o rechazo: confirmar la transacción con Transbank
    this.logger.debug(`[${req.method}] /webpay/commit token=${tokenWs}`);
    const response = await this.webpayService.commitTx(tokenWs);

    if (response.response_code === 0) {
      this.logger.debug(`Commit successful, redirecting to success`);
      return res.redirect('http://localhost:4000/result/success');
    }

    this.logger.warn(`Commit failed responseCode=${response.response_code}, redirecting to error`);
    return res.redirect('http://localhost:4000/result/error');
  }

  @Get('/status/:token_ws')
  status(@Param('token_ws') tokenWs: string) {
    this.logger.debug(`GET /webpay/status token=${tokenWs}`);
    return this.webpayService.statusTx(tokenWs);
  }
}
