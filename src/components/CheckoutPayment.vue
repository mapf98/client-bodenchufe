<template>
  <v-row class="d-flex flex-wrap align-center">
    <v-col cols="1"></v-col>
    <v-col>
      <v-card max-width="400px" color="indigo" class="flex-wrap">
        <v-card-text
          class="title white--text font-weight-black d-flex align-center x-10"
        >
          {{ subtotal }}
          <v-card-text
            class="white--text font-weight-thin title d-flex justify-end"
          >
            {{ paymentDetail.orderSummary.subtotal }}$
          </v-card-text>
        </v-card-text>

        <v-card-text
          v-if="hasCoupon()"
          class="title white--text font-weight-black d-flex align-center mt-n12 x-10"
        >
          {{ coupon
          }}<v-card-text class="white--text font-weight-thin ml-n3">
            ({{ couponRate }})
          </v-card-text>

          <v-card-text
            class="white--text font-weight-thin title d-flex justify-end"
          >
            -{{ getDiscountAmount() }}$
          </v-card-text>
        </v-card-text>
        <v-card-text
          class="title white--text font-weight-black d-flex align-center mt-n12"
        >
          {{ commission }}
          <v-card-text
            class="white--text font-weight-thin d-flex justify-end title"
          >
            {{ paymentDetail.orderSummary.comissions_amount }}$
          </v-card-text>
        </v-card-text>
        <v-card-text class="white--text font-weight-thin mt-n12">
          (1.75% + 0.25$)
        </v-card-text>
        <v-divider class="amber"></v-divider>
        <v-card-text
          class="title white--text font-weight-black d-flex align-center x-10"
        >
          {{ total }}
          <v-card-text
            class="white--text font-weight-thin title d-flex justify-end"
          >
            {{
              `${
                hasCoupon()
                  ? getTotalWhitDiscount()
                  : paymentDetail.orderSummary.total
              }`
            }}$
          </v-card-text>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col>
      <v-btn
        x-large
        color="amber darken-2"
        class="white--text"
        @click="openPaymentGateway"
        :loading="loading"
      >
        {{ payCrypto }}
        <v-icon class="ml-4"> mdi-bitcoin</v-icon>
        <v-icon> mdi-ethereum </v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";

@Component({})
export default class CheckoutPayment extends Vue {
  commission = "Commissions";
  subtotal = "Subtotal";
  total = "Total";
  payCrypto = "Pay with crypto";
  coupon = "Coupon";
  loading = false;

  @Prop() paymentDetail!: any;
  @Prop() addressId!: number;
  @Prop() couponId!: number;
  @Prop() couponRate!: string;

  hasCoupon() {
    if (this.couponId >= 0) return true;
    else return false;
  }

  getDiscountAmount() {
    return (
      Math.round(
        (parseInt(this.couponRate.split("%")[0]) / 100) *
          this.paymentDetail.orderSummary.subtotal *
          100
      ) / 100
    );
  }

  getTotalWhitDiscount() {
    return (
      Math.round(
        (this.paymentDetail.orderSummary.total - this.getDiscountAmount()) * 100
      ) / 100
    );
  }

  openPaymentGateway() {
    this.loading = true;
    this.$store
      .dispatch("checkout/payOrder", {
        couponRate: this.couponRate,
        couponId: this.couponId == -1 ? null : this.couponId,
        deliveryAddressId: this.addressId,
        port: window.location.port,
      })
      .then(() => {
        this.loading = false;
        window.open(
          this.$store.getters["checkout/getUrlPaymentGateway"],
          "_self"
        );
      });
  }

  @Watch("translator")
  translate() {
    this.translator.forEach((term: any) => {
      switch (term.termName) {
        case "commissionsPay": {
          this.commission = term.termTranslation;
          break;
        }
        case "payCrypto": {
          this.payCrypto = term.termTranslation;
          break;
        }
        case "couponPay": {
          this.coupon = term.termTranslation;
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
