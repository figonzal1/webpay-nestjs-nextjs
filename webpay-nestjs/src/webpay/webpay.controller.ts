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
    const response = await this.webpayService.commitTx(tokenWs);

    if (response.response_code == 0) {
      res.redirect('http://localhost:4000/result/success');
    } else if (response.response_code != 0) {
      res.redirect('http://localhost:4000/result/error');
    }
    return response;
  }

  //Transbank devuelve callback en POST en desarrollo al fallar
  @Post('/commit')
  failedCallback(
    @Query('TKB_TOKEN') tbkToken: string,
    @Query('TKB_ORDEN_COMPRA') tbkOrdenCompra: string,
    @Query('TKB_ID_SESSION') tbkIdSession: string,
  ) {
    return {
      tbkToken: tbkToken,
      tbkOrdenCompra: tbkOrdenCompra,
      tbkIdSession: tbkIdSession,
    };
  }

  @Get('/status/:token_ws')
  status(@Param('token_ws') tokenWs: string) {
    return this.webpayService.statusTx(tokenWs);
  }
}
