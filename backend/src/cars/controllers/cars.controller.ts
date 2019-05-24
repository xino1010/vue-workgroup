import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {CarsService} from '../services/cars.service';
import {Car} from '../classes/car';

@Controller('cars')
export class CarsController {

  constructor(private readonly carsService: CarsService) {
  }

  @Get()
  getCars(): Car[] {
    return this.carsService.getCars();
  }

  @Post()
  createCar(@Body() car: Car): Car {
    return this.carsService.createCar(car);
  }

  @Put()
  updateCar(@Body() car: Car): Car {
    return this.carsService.updateCar(car);
  }

  @Delete(':id')
  removeCar(@Param('id') id: string): Car {
    const carId: number = parseInt(id, 10);
    return this.carsService.removeCar(carId);
  }

}

