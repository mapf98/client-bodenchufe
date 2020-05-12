<template>
  <v-container fluid>
    <v-row>
      <v-col class="d-flex justify-center">
        <v-btn
          class="ma-2"
          tile
          outlined
          color="success"
          x-large
          :loading="loading"
          @click="login"
        >
          Ingresar al portal
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class Home extends Vue {
  loading = false;

  login(){
    this.$router.push("/");
  }
}
</script>

<style lang="scss"></style>
