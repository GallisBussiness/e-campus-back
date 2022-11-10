import { Test, TestingModule } from '@nestjs/testing';
import { PayementSubjectController } from './payement-subject.controller';
import { PayementSubjectService } from './payement-subject.service';

describe('PayementSubjectController', () => {
  let controller: PayementSubjectController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PayementSubjectController],
      providers: [PayementSubjectService],
    }).compile();

    controller = module.get<PayementSubjectController>(PayementSubjectController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
