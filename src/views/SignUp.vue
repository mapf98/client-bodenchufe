<template>
  <v-container>
    <AllSignUp />
    <Footer />
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Footer from "../components/Footer.vue";
import AllSignUp from "../components/AllSignUp.vue";

@Component({
  components: {
    Footer,
    AllSignUp,
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
