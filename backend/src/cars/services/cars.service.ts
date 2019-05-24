import {Injectable} from '@nestjs/common';
import {Car} from '../classes/car';

@Injectable()
export class CarsService {

  private cars: Car[];
  private lastId: number;

  constructor() {
    this.initializeCars();
  }

  public createCar(newCar: Car): Car {
    this.lastId++;
    newCar.id = this.lastId;
    this.cars.push(newCar);
    return newCar;
  }

  public getCars(): Car[] {
    return this.cars;
  }

  private initializeCars(): void {
    this.cars = [];
    this.lastId = 0;

    const car1: Car = new Car();
    car1.id = 1;
    car1.mark = 'Ford';
    car1.model = 'Focus';
    car1.description = 'Description Ford Focus';
    car1.stock = 1;
    this.cars.push(car1);
    this.lastId++;

    const car2: Car = new Car();
    car2.id = 2;
    car2.mark = 'Seat';
    car2.model = 'Ibiza';
    car2.description = 'Description Seat Ibiza';
    car2.stock = 3;
    this.cars.push(car2);
    this.lastId++;

    const car3: Car = new Car();
    car3.id = 3;
    car3.mark = 'BMW';
    car3.model = 'X5';
    car3.description = 'Description BMW X5';
    car3.stock = 0;
    this.cars.push(car3);
    this.lastId++;
  }

  public updateCar(car: Car): Car {
    const index: number = this.cars.findIndex((tmpCar: Car) => {
      return tmpCar.id === car.id;
    });
    if (index > -1) {
      this.cars[index] = car;
      return car;
    } else {
      return null;
    }
  }

  public removeCar(id: number): Car {
    const index: number = this.cars.findIndex((car: Car) => {
      return car.id === id;
    });
    if (index > -1) {
      const car: Car = this.cars[index];
      this.cars.splice(index, 1);
      return car;
    } else {
      return null;
    }
  }

}
