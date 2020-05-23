<template>
  <v-container fluid>
    <v-card class="mb-5" color="indigo" elevation="5">
      <v-card-title class="white--text font-weight-bold .subtitle-1">{{
        coupon.coupon_name
      }}</v-card-title>
      <v-card-text>
        <v-row class="d-flex">
          <v-col>
            <div class="amber--text display-1">
              {{ coupon.coupon_discount_rate }} {{ discountRateText }}
            </div>
            <div class="white--text">
              {{ canBeUsedInText }}: {{ coupon.coupon_min_use }}$ -
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
import { Prop, Watch } from "vue-property-decorator";

@Component({})
export default class UserCoupons extends Vue {
  @Prop() userCoupon!: any;
  coupon = this.userCoupon;

  discountRateText = "Discount";
  canBeUsedInText = "On purchases between";

  mounted() {
    this.translate();
    this.coupon = this.userCoupon;
  }

  @Watch("translator")
  translate() {
    this.translator.forEach((term: any) => {
      switch (term.termName) {
        case "discountRateText": {
          this.discountRateText = term.termTranslation;
          break;
        }
        case "canBeUsedInText": {
          this.canBeUsedInText = term.termTranslation;
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  get translator() {
    return this.$store.getters["internationalization/getLanguageTexts"];
  }
}
</script>

<style lang="scss"></style>
