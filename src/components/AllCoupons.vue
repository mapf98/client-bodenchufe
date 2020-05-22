<template>
  <v-container fluid>
    <v-row>
      <v-col class="text-center">
        <h1 class="blue--text">{{ couponTitleText }}</h1>
        <hr />
      </v-col>
    </v-row>
    <v-row
      class="d-flex justify-center"
      v-for="coupon of userCoupons"
      :key="coupon.coupon_id"
    >
      <v-col :cols="separatorCols()">
        <UserCoupon :userCoupon="coupon" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import UserCoupon from "../components/UserCoupon.vue";
import { Watch } from "vue-property-decorator";

@Component({
  components: {
    UserCoupon,
  },
})
export default class AllCoupons extends Vue {
  coupons = [];
  couponTitleText = "Coupons";

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
    this.translate();
    this.getUserCoupons();
  }

  @Watch("translator")
  translate() {
    this.translator.forEach((term: any) => {
      switch (term.termName) {
        case "couponTitleText": {
          this.couponTitleText = term.termTranslation;
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
