<template>
  <v-container fluid class="red">
    <v-row>
      <v-col class="d-flex justify-center">
        <h1 class="mt-5">COMPONENTE DE PRUEBA TEST 2</h1>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";

@Component({})
export default class Login extends Vue {}
</script>

<style lang="scss"></style>
