<template>
  <v-container>
    <v-row cols="12">
      <v-col class="d-flex justify-center mb-12">
        <router-link to="/">
          <v-img src="../assets/logoBodenchufe.png" max-width="300"></v-img
        ></router-link>
      </v-col>
    </v-row>

    <v-row>
      <v-col class="d-flex justify-center mt-12">
        <v-btn color="indigo" class="white--text">{{
          UsualRegistration
        }}</v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col class="d-flex justify-center">
        <v-btn color="indigo" class="white--text">{{
          GoogleRegistration
        }}</v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col class="d-flex justify-center">
        <v-btn color="indigo" class="white--text">{{
          FacebookRegistration
        }}</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class AllSignUp extends Vue {
  loading = false;
  UsualRegistration = "Registro Habitual";
  GoogleRegistration = "Registro con Google";
  FacebookRegistration = "Registro con Facebook";
}
</script>
