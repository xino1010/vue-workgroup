<template>
  <div class="home">
    <img src="../assets/logo.png" alt="Vue logo" class="img-responsive center-block" />
    <h1 class="text-center">My first Vue App</h1>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';

  @Component
  export default class Home extends Vue {
  }
</script>
