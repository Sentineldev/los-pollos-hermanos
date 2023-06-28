import { Module } from '@nestjs/common';
import { FireormModule } from 'nestjs-fireorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DishModule } from './dish/dish.module';
import { OrderModule } from './order/order.module';
import { firebaseSettings } from './credentials/firebase.credentials';

@Module({
  imports: [
    DishModule, 
    OrderModule,
    FireormModule.forRoot({fireormSettings: {validateModels: true},firestoreSettings: firebaseSettings})],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
