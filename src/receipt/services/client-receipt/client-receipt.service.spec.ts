import { Test, TestingModule } from '@nestjs/testing';
import { ClientReceiptService } from './client-receipt.service';

describe('ClientReceiptService', () => {
  let service: ClientReceiptService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientReceiptService],
    }).compile();

    service = module.get<ClientReceiptService>(ClientReceiptService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
