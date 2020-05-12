<template>
  <v-container fluid>
    <v-row>
      <v-col class="d-flex justify-center">
        <v-btn small color="primary" @click="ingresar">Ingresar</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";

@Component({})
export default class Login extends Vue {
  ingresar(){
    this.$router.push("Dashboard");
  }
}
</script>

<style lang="scss"></style>
