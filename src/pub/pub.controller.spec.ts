import { Test, TestingModule } from '@nestjs/testing';
import { PubController } from './pub.controller';
import { PubService } from './pub.service';

describe('PubController', () => {
  let controller: PubController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PubController],
      providers: [PubService],
    }).compile();

    controller = module.get<PubController>(PubController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
