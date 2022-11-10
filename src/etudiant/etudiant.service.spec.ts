import { Test, TestingModule } from '@nestjs/testing';
import { EtudiantService } from './etudiant.service';

describe('EtudiantService', () => {
  let service: EtudiantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EtudiantService],
    }).compile();

    service = module.get<EtudiantService>(EtudiantService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
