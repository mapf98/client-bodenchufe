<template>
  <v-container fluid>
    <v-card class="mb-5" color="indigo" elevation="5">
      <v-card-title class="white--text font-weight-bold .subtitle-1">{{
        coupon.coupon_name
      }}</v-card-title>
      <v-card-text>
        <v-row class="d-flex">
          <v-col>
            <div class="amber--text display-2">
              {{ coupon.coupon_discount_rate }} {{ discountRateText }}
            </div>
            <div class="white--text">
              {{ canBeUsedText }}: {{ coupon.coupon_min_use }}$ -
              {{ coupon.coupon_max_use }}$
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Component({})
export default class UserCoupons extends Vue {
  @Prop() userCoupon!: any;
  coupon = this.userCoupon;

  discountRateText = "Discount";
  canBeUsedText = "On purchases between";

  mounted() {
    this.coupon = this.userCoupon;
  }
}
</script>

<style lang="scss"></style>
