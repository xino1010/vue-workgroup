<template>
  <div class="cars">
    <v-snackbar
        :right="true"
        :timeout="3000"
        :top="true"
        color="success"
        v-model="showSnackBar"
    >
      <v-icon dark small>check_circle</v-icon>
      {{ textSnackBar }}
    </v-snackbar>
    <div>
      <h1 class="text-xs-center">List of cars</h1>
      <v-flex class="text-xs-right">
        <v-btn @click="newCar" color="warning" dark fab small title="New car">
          <v-icon dark small>add</v-icon>
        </v-btn>
      </v-flex>
    </div>
    <v-data-table
        :headers="headers"
        :items="cars"
        class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <tr v-bind:class="{'no-stock': props.item.stock == 0}">
          <td class="text-xs-left">{{ props.item.id }}</td>
          <td class="text-xs-left">{{ props.item.mark }}</td>
          <td class="text-xs-left">{{ props.item.model }}</td>
          <td class="text-xs-left">{{ props.item.description }}</td>
          <td class="text-xs-left">{{ props.item.stock }}</td>
          <td class="text-xs-center">
            <v-btn @click="editCar(props.item)"
                   color="primary"
                   dark fab small v-if="props.item.stock > 0">
              <v-icon small dark>edit</v-icon>
            </v-btn>
            <v-btn @click="removeCar(props.item)"
                   color="error" dark fab small>
              <v-icon dark small>remove</v-icon>
            </v-btn>
          </td>
        </tr>
      </template>
    </v-data-table>
    <CarDetails :car="selectedCar" v-if="selectedCar != null" v-on:savedCar="onSavedCar($event)"></CarDetails>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import CarDetails from '@/components/CarDetails.vue';
  import {Car} from '@/classes/car';
  import {cloneObject} from '@/services/utils';
  import {Action, State} from 'vuex-class';
  import {CARS, CARS_DELETE, CARS_LIST, CARS_MODULE, CARS_NEW, CARS_UPDATE} from '@/modules/cars/cars.types';

  @Component({
    components: {CarDetails},
  })
  export default class Cars extends Vue {

    @Action(CARS_LIST, {namespace: CARS_MODULE}) private getCars!: () => Promise<Car[]>;
    // TODO: Action para crear objeto
    // TODO: Action para editar objeto
    // TODO: Action para eliminar objeto
    @State(CARS, {namespace: CARS_MODULE}) public cars!: Car[];
    public selectedCar: Car | null = null;
    public showSnackBar: boolean = false;
    public headers: any[] = [
      {text: 'Id', align: 'left', sortable: true, value: 'id'},
      {text: 'Mark', align: 'left', sortable: true, value: 'mark'},
      {text: 'Model', align: 'left', sortable: true, value: 'model'},
      {text: 'Description', align: 'left', sortable: true, value: 'description'},
      {text: 'Stock', align: 'left', sortable: true, value: 'stock'},
      {text: 'Actions', align: 'center', sortable: false, value: null},
    ];
    public textSnackBar: string = '';

    private mounted() {
      this.getCars().then((cars: Car[]) => {
      });
    }

    public newCar(): void {
      this.selectedCar = new Car();
    }

    public editCar(car: Car): void {
      this.selectedCar = cloneObject(car);
    }

    public removeCar(car: Car): void {
      // TODO: utilizar acción de Vuex para eliminar el objeto
    }

    public onSavedCar(car: Car): void {
      if (car != null) {
        const index: number = this.cars.findIndex((tmpCar: Car) => {
          return tmpCar.id === car.id;
        });
        if (index > -1) {
          // TODO: utilizar acción de Vuex para actualizar el objeto
        } else {
          // TODO: utilizar acción de Vuex para crear el objeto
        }
      }
      this.selectedCar = null;
    }

  }

</script>

<style>

  .no-stock {
    background-color: #ed5565;
    color: #ffffff;
  }

</style>