import { Test, TestingModule } from '@nestjs/testing';
import { PayementSubjectService } from './payement-subject.service';

describe('PayementSubjectService', () => {
  let service: PayementSubjectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PayementSubjectService],
    }).compile();

    service = module.get<PayementSubjectService>(PayementSubjectService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
