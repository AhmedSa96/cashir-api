import { Test, TestingModule } from '@nestjs/testing';
import { SupplierReceiptService } from './supplier-receipt.service';

describe('SupplierReceiptService', () => {
  let service: SupplierReceiptService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SupplierReceiptService],
    }).compile();

    service = module.get<SupplierReceiptService>(SupplierReceiptService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
