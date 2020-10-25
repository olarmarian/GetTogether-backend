import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { FirebaseConfigModule } from './firebase-config/firebase-config.module';

@Module({
  imports: [RestaurantsModule, FirebaseConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
