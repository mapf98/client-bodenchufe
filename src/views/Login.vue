<template>
  <v-container>
    <v-row cols="12">
      <v-col class="d-flex justify-center">
        <router-link to="/">
          <v-img src="../assets/logoBodenchufe.png" max-width="300"></v-img
        ></router-link>
      </v-col>
    </v-row>

    <v-row cols="d-flex">
      <v-col md="6">
        <NotFederatedLogIn />
      </v-col>
      <v-col md="6">
        <b>O Inicia sesion a traves de:</b>
        <GoogleFederatedLogIn />
        <FacebookFederatedLogIn />
      </v-col>
    </v-row>

    <v-row>
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
export default class Home extends Vue {
  loading = false;

  login() {
    this.$router.push("/");
  }
}
</script>

<style lang="scss"></style>
