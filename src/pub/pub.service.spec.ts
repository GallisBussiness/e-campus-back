import { Test, TestingModule } from '@nestjs/testing';
import { PubService } from './pub.service';

describe('PubService', () => {
  let service: PubService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PubService],
    }).compile();

    service = module.get<PubService>(PubService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
