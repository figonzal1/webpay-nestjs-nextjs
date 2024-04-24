import { Test, TestingModule } from '@nestjs/testing';
import { WebpayService } from './webpay.service';

describe('WebpayService', () => {
  let service: WebpayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebpayService],
    }).compile();

    service = module.get<WebpayService>(WebpayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
