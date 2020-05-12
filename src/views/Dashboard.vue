<template>
  <v-container fluid>
    <v-row>
      <Home />
    </v-row>
    <v-row class="primary">
      <v-col class="d-flex justify-center">
        <v-btn small color="primary" @click="ingresar(1)">Prueba 1</v-btn>
        <v-btn small color="primary" @click="ingresar(2)">Prueba 2</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <router-view></router-view>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";
import Home from "../views/Home.vue";

@Component({
  components: {
    Home
  }
})
export default class Login extends Vue {
  ingresar(value: any){
    if(value == 1){
      this.$router.push("/dashboard/T1").catch(err => {alert("Ya estas en la pantalla seleccionada!")});
    }else{
      this.$router.push("/dashboard/T2").catch(err => {alert("Ya estas en la pantalla seleccionada!")});
    }
  }
}
</script>

<style lang="scss"></style>
