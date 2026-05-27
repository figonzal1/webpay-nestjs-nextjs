import { Controller, Get, Post, Body, Param, Query, Res } from '@nestjs/common';
import { WebpayService } from './webpay.service';
import { CreateWebpayDto } from './dto/create-webpay.dto';
import { Response } from 'express';

@Controller('webpay')
export class WebpayController {
  constructor(private readonly webpayService: WebpayService) {}

  @Post()
  create(@Body() createWebpayDto: CreateWebpayDto) {
    return this.webpayService.createTx(createWebpayDto);
  }

  @Get('/commit')
  async callback(@Query('token_ws') tokenWs: string, @Res() res: Response) {
    if (!tokenWs) {
      return res.redirect('http://localhost:4000/result/error');
    }

    const response = await this.webpayService.commitTx(tokenWs);

    if (response.response_code === 0) {
      return res.redirect('http://localhost:4000/result/success');
    }
    return res.redirect('http://localhost:4000/result/error');
  }

  // Transbank envía POST al returnUrl con los parámetros en el body al abortar o timeout
  @Post('/commit')
  failedCallback(
    @Body('TBK_TOKEN') tbkToken: string,
    @Body('TBK_ORDEN_COMPRA') tbkOrdenCompra: string,
    @Body('TBK_ID_SESSION') tbkIdSession: string,
  ) {
    return { tbkToken, tbkOrdenCompra, tbkIdSession };
  }

  @Get('/status/:token_ws')
  status(@Param('token_ws') tokenWs: string) {
    return this.webpayService.statusTx(tokenWs);
  }
}
