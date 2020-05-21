<template>
  <v-container fluid>
    <v-app-bar>
      <v-row>
        <v-col :cols="separatorCols()"></v-col>
        <v-col class="d-flex justify-center text-center">
          <v-btn
            color="indigo"
            class="white--text"
            :width="buttonCols()"
            :outlined="!InAddressView"
            @click="goToMyAddresses()"
            >Mis direcciones</v-btn
          >
        </v-col>
        <v-col class="d-flex justify-center text-center">
          <v-btn
            color="indigo"
            class="white--text text-center"
            :width="buttonCols()"
            :outlined="!InAddView"
            @click="goToAddAddress()"
            >Agregar una direccion</v-btn
          >
        </v-col>
        <v-col :cols="separatorCols()"></v-col>
      </v-row>
    </v-app-bar>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class DeliveryBar extends Vue {
  InAddressView = true;
  InAddView = false;
  buttonCols() {
    const { xs, sm } = this.$vuetify.breakpoint;
    return xs ? 105 : sm ? 280 : 210;
  }
  separatorCols() {
    const { xs, sm } = this.$vuetify.breakpoint;
    return xs || sm ? 12 : 3;
  }
  goToMyAddresses() {
    this.InAddressView = false;
    this.InAddView = true;
    this.$router.push("/delivery");
  }
  goToAddAddress() {
    this.InAddView = false;
    this.InAddressView = true;
    this.$router.push("/delivery/add");
  }
}
</script>

<style lang="scss"></style>
