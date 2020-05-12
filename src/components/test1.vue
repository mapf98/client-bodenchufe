<template>
  <v-container fluid class="purple">
    <v-row>
      <v-col class="d-flex justify-center">
        <h1 class="mt-5 mr-5">Test 1</h1>
        <v-avatar tile color="blue">
          <v-icon dark>mdi-alarm</v-icon>
        </v-avatar>
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
