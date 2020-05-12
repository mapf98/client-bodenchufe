<template>
  <v-app>
    <Navbar v-if="!$route.meta.hideBasicComponents"/>
    <v-content>
      <router-view></router-view>
    </v-content>
    <Footer v-if="!$route.meta.hideBasicComponents"/>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Navbar from "../src/components/Navbar.vue";
import Footer from "../src/components/Footer.vue";

@Component({
  components: {
    Navbar,
    Footer
  }
})
export default class App extends Vue {}
</script>
