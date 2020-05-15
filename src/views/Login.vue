<template>
  <v-container fluid>
    <v-row>
      <v-col class="d-flex justify-center">
        <router-link to="/">
          <v-img src="../assets/logoBodenchufe.png" max-width="300"></v-img
        ></router-link>
      </v-col>
    </v-row>

    <v-row class="d-flex align-center mt-12">
      <v-col cols="1"></v-col>
      <v-col>
        <NotFederatedLogIn />
      </v-col>
      <v-col cols="2"></v-col>
      <v-col>
        <v-row>
          <v-col class="d-flex justify-center">
            <b>O Inicia sesion a traves de:</b>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="d-flex justify-center">
            <GoogleFederatedLogIn />
          </v-col>
        </v-row>
        <v-row>
          <v-col class="d-flex justify-center">
            <FacebookFederatedLogIn />
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="1"></v-col>
    </v-row>

    <v-row class="mt-12">
      <v-col class="d-flex justify-center">
        ERROR
      </v-col>
    </v-row>

    <v-row class="d-flex align-end mt-12">
      <v-col class="d-flex justify-center">
        <v-btn color="indigo" class="white--text">Registrarse</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import NotFederatedLogIn from "../components/NotFederatedLogIn.vue";
import GoogleFederatedLogIn from "../components/GoogleFederatedLogin.vue";
import FacebookFederatedLogIn from "../components/FacebookFederatedLogin.vue";

@Component({
  components: {
    NotFederatedLogIn,
    GoogleFederatedLogIn,
    FacebookFederatedLogIn,
  },
})
export default class Home extends Vue {}
</script>

<style lang="scss"></style>
