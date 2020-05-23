<template>
  <v-container fluid>
    <AllCoupons />
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import AllCoupons from "../components/AllCoupons.vue";

@Component({
  components: {
    AllCoupons,
  },
})
export default class Coupons extends Vue {}
</script>

<style lang="scss"></style>
