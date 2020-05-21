<template>
  <v-card color="indigo">
    <v-card-text class="subtitle-1 white--text font-weight-black">
      {{ coupon.coupon_name }}
    </v-card-text>
    <v-card-text class="mt-n9 white--text font-weight-thin">
      {{ coupon.coupon_discount_rate }}
    </v-card-text>
    <v-row class="d-flex justify-center pb-5">
      <v-btn
        @click="setCoupon(coupon.coupon_id, coupon.coupon_discount_rate)"
        small
      >
        {{ select }}
      </v-btn>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";

@Component({})
export default class CheckoutCoupons extends Vue {
  quantity = "Quantity";
  discount = "Off";
  included = "included";

  select = "Select";

  @Prop() coupon!: object;

  @Watch("translator")
  translate() {
    this.translator.forEach((term: any) => {
      switch (term.termName) {
        case "shoppingCartQuantity": {
          this.quantity = term.termTranslation;
          break;
        }
        case "shoppingCartDiscount": {
          this.discount = term.termTranslation;
          break;
        }
        case "discountIncluded": {
          this.included = term.termTranslation;
          break;
        }
      }
    });
  }

  setCoupon(id: number, rate: string) {
    this.$emit("orderCouponId", id);
    this.$emit("orderCouponRate", rate);
  }

  get translator() {
    return this.$store.getters["internationalization/getLanguageTexts"];
  }
}
</script>

<style lang="scss"></style>
