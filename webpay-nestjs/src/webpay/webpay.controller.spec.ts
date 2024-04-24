import { Test, TestingModule } from '@nestjs/testing';
import { WebpayController } from './webpay.controller';
import { WebpayService } from './webpay.service';

describe('WebpayController', () => {
  let controller: WebpayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WebpayController],
      providers: [WebpayService],
    }).compile();

    controller = module.get<WebpayController>(WebpayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
