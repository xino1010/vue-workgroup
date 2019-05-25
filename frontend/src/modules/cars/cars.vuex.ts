import {Car} from '@/classes/car';
import {ActionTree, GetterTree, Module, MutationTree} from 'vuex';
import {Vue} from 'vue-property-decorator';
import {CARS, CARS_DELETE, CARS_LIST, CARS_NEW, CARS_UPDATE} from '@/modules/cars/cars.types';
import {AxiosError, AxiosResponse} from 'axios';
import Api from '@/services/api';

interface CarsState {
  cars: Car[];
}

const carsState: CarsState = {
  cars: [],
};

const carsGetters: GetterTree<CarsState, any> = {};

const carsMutations: MutationTree<CarsState> = {
  [CARS_LIST]: (state: CarsState, cars: Car[]) => {
    Vue.set(state, CARS, cars);
  },
  [CARS_NEW]: (state: CarsState, car: Car) => {
    state.cars.push(car);
  },
  [CARS_UPDATE]: (state: CarsState, car: Car) => {
    const index: number = state.cars.findIndex((tmpCar: Car) => {
      return tmpCar.id === car.id;
    });
    if (index > -1) {
      Vue.set(state.cars, index, car);
    }
  },
  [CARS_DELETE]: (state: CarsState, car: Car) => {
    const index: number = state.cars.findIndex((tmpCar: Car) => {
      return tmpCar.id === car.id;
    });
    if (index > -1) {
      state.cars.splice(index, 1);
    }
  },
};

const carsActions: ActionTree<CarsState, any> = {
  [CARS_LIST]: ({commit, dispatch}): Promise<Car[]> => {
    return new Promise<Car[]>((resolve) => {
      Api().get(`cars`)
        .then((response: AxiosResponse) => {
          const cars: Car[] = response.data;
          commit(CARS_LIST, cars);
          resolve(cars);
        }).catch((error: AxiosError) => {
        console.log(error);
      });
    });
  },
  [CARS_NEW]: ({commit, dispatch}, car: Car): Promise<Car> => {
    return new Promise<Car>((resolve) => {
      Api().post(`cars`, car)
        .then((response: AxiosResponse) => {
          const newCar: Car = response.data;
          commit(CARS_NEW, newCar);
          resolve(newCar);
        }).catch((error: AxiosError) => {
        console.log(error);
      });
    });
  },
  [CARS_UPDATE]: ({commit, dispatch}, car: Car): Promise<Car> => {
    return new Promise<Car>((resolve) => {
      Api().put(`cars`, car)
        .then((response: AxiosResponse) => {
          const updatedCar: Car = response.data;
          commit(CARS_UPDATE, updatedCar);
          resolve(updatedCar);
        }).catch((error: AxiosError) => {
        console.log(error);
      });
    });
  },
  [CARS_DELETE]: ({commit, dispatch}, car: Car): Promise<Car> => {
    return new Promise<Car>((resolve) => {
      Api().delete(`cars/${car.id}`)
        .then((response: AxiosResponse) => {
          const deletedCar: Car = response.data;
          commit(CARS_DELETE, deletedCar);
          resolve(deletedCar);
        }).catch((error: AxiosError) => {
        console.log(error);
      });
    });
  },
};

export const CarsModule: Module<CarsState, any> = {
  actions: carsActions,
  getters: carsGetters,
  mutations: carsMutations,
  namespaced: true,
  state: carsState,
};
