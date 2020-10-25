import { Test, TestingModule } from '@nestjs/testing';
import { FirebaseConfigService } from './firebase-config.service';

describe('FirebaseConfigService', () => {
  let service: FirebaseConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FirebaseConfigService],
    }).compile();

    service = module.get<FirebaseConfigService>(FirebaseConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
