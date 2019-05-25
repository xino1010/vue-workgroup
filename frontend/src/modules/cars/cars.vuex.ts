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
    // TODO: añadir el objeto al array
  },
  [CARS_UPDATE]: (state: CarsState, car: Car) => {
    // TODO: buscar la posición que ocupa el objeto en el array y 'setearlo' por el 'actual'
  },
  [CARS_DELETE]: (state: CarsState, car: Car) => {
    // TODO: buscar la posición que ocupa el objeto en el array y eliminarlo del array
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
  [CARS_NEW]: ({commit, dispatch}, newCar: Car): Promise<Car> => {
    return new Promise<Car>((resolve) => {
      // TODO: petición al servidor y llamar a la mutación correspondiente
    });
  },
  [CARS_UPDATE]: ({commit, dispatch}, car: Car): Promise<Car> => {
    return new Promise<Car>((resolve) => {
      // TODO: petición al servidor y llamar a la mutación correspondiente
    });
  },
  [CARS_DELETE]: ({commit, dispatch}, car: Car): Promise<Car> => {
    return new Promise<Car>((resolve) => {
      // TODO: petición al servidor y llamar a la mutación correspondiente
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
