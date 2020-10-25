import { Module } from '@nestjs/common';
import { RestaurantsController } from './restaurants.controller';
import { RestaurantsService } from './restaurants.service';
import { FirebaseConfigModule } from '../firebase-config/firebase-config.module';
import { FirebaseConfigService } from 'src/firebase-config/firebase-config.service';

@Module({
  imports: [FirebaseConfigModule],
  controllers: [RestaurantsController],
  providers: [RestaurantsService, FirebaseConfigService],
})
export class RestaurantsModule {}
