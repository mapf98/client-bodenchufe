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
      <router-view></router-view>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Footer from "../components/Footer.vue";

@Component({
  components: {
    Footer,
  },
})
export default class SignUp extends Vue {}
</script>

<style lang="scss"></style>
