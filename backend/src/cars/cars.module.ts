import {Module} from '@nestjs/common';
import {CarsController} from './controllers/cars.controller';
import {CarsService} from './services/cars.service';

@Module({
  controllers: [CarsController],
  providers: [CarsService],
})
export class CarsModule {
}
