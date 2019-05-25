<template>
  <div class="car-details">
    <v-dialog :scrollable="true" max-width="500px" persistent v-model="showModal">
      <v-card>
        <v-card-title class="headline">
          {{ isNewCar() ? 'New Car' : 'Edit car' }}
        </v-card-title>
        <v-card-text>
          <v-form
              lazy-validation
              ref="form"
              v-model="valid"
          >
            <v-text-field
                :counter="10"
                :rules="markRules"
                label="Mark"
                required
                v-model="car.mark"
            ></v-text-field>
            <v-text-field
                :rules="modelRules"
                label="Model"
                required
                v-model="car.model"
            ></v-text-field>
            <v-textarea
                hint="Description"
                label="Description"
                v-model="car.description"
            ></v-textarea>
            <v-text-field
                :rules="stockRules"
                label="Stock"
                min="0"
                required
                type="number"
                v-model.number="car.stock"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="hideModal()">
            Cancel
          </v-btn>
          <v-btn
              :disabled="!valid"
              @click="save"
              color="success"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import {Car} from '@/classes/car';

  @Component
  export default class CarDetails extends Vue {
    @Prop() public car!: Car;
    public showModal: boolean = false;
    public valid: boolean = true;
    public markRules: any[] = [
      (v: string) => !!v || 'Mark is required',
      (v: string) => (v && v.length <= 10) || 'Mark must be less than 10 characters',
    ];
    public modelRules: any[] = [
      (v: string) => !!v || 'Model is required',
      (v: string) => (v && v.length <= 10) || 'Model must be less than 10 characters',
    ];
    public stockRules: any[] = [
      (v: number) => v > 0 || 'Stock is required',
    ];

    public mounted(): void {
      this.showModal = true;
    }

    public hideModal(): void {
      this.$emit('savedCar', null);
      this.showModal = false;
    }

    public save(): void {
      if ((this.$refs.form as any).validate()) {
        if (this.isNewCar()) {
          this.car.id = Math.floor(Math.random() * 100);
        }
        this.$emit('savedCar', this.car);
        this.showModal = false;
      }
    }

    private isNewCar(): boolean {
      return this.car.id <= 0;
    }

  }

</script>

<style scoped>

  .car-details {
    margin-top: 50px;
  }

</style>