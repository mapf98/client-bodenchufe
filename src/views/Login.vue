<template>
  <v-container>
    <v-row cols="12">
      <v-col class="d-flex justify-center">
        <router-link to="/">
          <v-img src="../assets/logoBodenchufe.png" max-width="300"></v-img
        ></router-link>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="5">
        <NotFederatedLogIn />
      </v-col>
    </v-row>

    <v-row>
      <v-col class="d-flex justify-center">
        <v-btn>Registrarse</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import NotFederatedLogIn from "../components/NotFederatedLogIn.vue";

@Component({
  components: {
    NotFederatedLogIn,
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
