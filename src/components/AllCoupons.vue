<template>
  <v-container fluid>
    <v-row>
      <v-col class="text-center">
        <h1 class="blue--text">Coupons</h1>
        <hr />
      </v-col>
    </v-row>
    <v-row
      class="d-flex justify-center"
      v-for="coupon of userCoupons"
      :key="coupon.coupon_id"
    >
      <v-col :cols="separatorCols()">
        <UserCoupon :userCoupon="coupon"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import UserCoupon from "../components/UserCoupon.vue";

@Component({
  components: {
    UserCoupon,
  },
})
export default class AllCoupons extends Vue {
  coupons = [];

  separatorCols() {
    const { xs, sm } = this.$vuetify.breakpoint;
    return xs || sm ? 12 : 3;
  }

  getUserCoupons() {
    this.$store.dispatch("coupon/getUserCoupon");
  }

  get userCoupons() {
    return this.$store.getters["coupon/getUserCoupons"];
  }

  mounted() {
    this.getUserCoupons();
  }
}
</script>

<style lang="scss"></style>
