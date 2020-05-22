<template>
  <v-container fluid>
    <v-row>
      <v-col class="d-flex justify-center">
        <router-link to="/home">
          <v-img src="../assets/logoBodenchufe.png" max-width="300"></v-img
        ></router-link>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <DeliveryBar />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <router-view></router-view>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import DeliveryBar from "../components/DeliveryBar.vue";

@Component({
  components: {
    DeliveryBar,
  },
})
export default class DeliveryAddress extends Vue {}
</script>

<style lang="scss"></style>
