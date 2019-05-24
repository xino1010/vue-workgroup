<template>
  <div class="cars">
    <h1 class="text-xs-center">List of cars</h1>
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
            <v-btn v-if="props.item.stock > 0" fab dark small color="primary">
              <v-icon small dark>edit</v-icon>
            </v-btn>
          </td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import CarDetails from '@/components/CarDetails.vue';
  import {Car} from '@/classes/car';

  @Component({
    components: {CarDetails},
  })
  export default class Cars extends Vue {

    public cars: Car[] = [];
    public headers: any[] = [
      {text: 'Id', align: 'left', sortable: true, value: 'id'},
      {text: 'Mark', align: 'left', sortable: true, value: 'mark'},
      {text: 'Model', align: 'left', sortable: true, value: 'model'},
      {text: 'Description', align: 'left', sortable: true, value: 'description'},
      {text: 'Stock', align: 'left', sortable: true, value: 'stock'},
      {text: 'Actions', align: 'center', sortable: false, value: null},
    ];
    private readonly NUM_CARS = 10;

    private mounted() {
      this.initializeCars();
    }

    private initializeCars(): void {
      this.cars = [];
      for (let i = 0; i < this.NUM_CARS; i++) {
        const car: Car = new Car();
        const j = i + 1;
        car.id = j;
        car.mark = `Mark ${j}`;
        car.model = `Model ${j}`;
        car.description = `Description ${j}`;
        car.stock = i;
        this.cars.push(car);
      }
    }

  }

</script>

<style>

  .no-stock {
    background-color: #ed5565;
    color: #ffffff;
  }

</style>