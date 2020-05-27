<template>
  <v-container>
    <v-row cols="12">
      <v-col class="d-flex justify-center mb-12">
        <router-link to="/home">
          <v-img src="../assets/logoBodenchufe.png" max-width="300"></v-img
        ></router-link>
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

@Component({})
export default class SignUp extends Vue {}
</script>

<style lang="scss"></style>
