<template>
  <v-row class="d-flex flex-wrap align-center">
    <v-col class="d-flex justify-center">
      <v-card
        min-width="210px"
        max-width="400px"
        color="indigo"
        class="flex-wrap pa-2"
      >
        <div class="d-flex justify-space-between align-center">
          <p class="mb-0 mr-8 white--text subtitle-1 font-weight-black">
            {{ subtotal }}
          </p>
          <p class="mb-0 white--text">
            {{ paymentDetail.orderSummary.subtotal }}$
          </p>
        </div>

        <div
          class="d-flex justify-space-between align-center"
          v-if="hasCoupon()"
        >
          <div class="d-flex justify-center align-center">
            <p class="mb-0 mr-1 white--text subtitle-1 font-weight-black">
              {{ coupon }}
            </p>
            <p class="mb-0 white--text font-weight-thin subtitle-2">
              ({{ couponRate }})
            </p>
          </div>
          <p class="mb-0 white--text">-{{ getDiscountAmount() }}$</p>
        </div>

        <div class="d-flex justify-space-between align-baseline mb-6">
          <div>
            <p class="mb-0 mr-1 white--text subtitle-1 font-weight-black">
              {{ commission }}
            </p>
            <p class="mb-0 white--text font-weight-thin subtitle-2">
              (1.75% + 0.25$)
            </p>
          </div>
          <p class="mb-0 white--text">
            {{ paymentDetail.orderSummary.comissions_amount }}$
          </p>
        </div>

        <v-divider class="amber"></v-divider>

        <div class="d-flex justify-space-between align-center">
          <p class="mb-0 mr-1 white--text subtitle-1 font-weight-black">
            {{ total }}
          </p>
          <p class="mb-0 white--text">
            {{
              `${
                hasCoupon()
                  ? getTotalWhitDiscount()
                  : paymentDetail.orderSummary.total
              }`
            }}$
          </p>
        </div>
      </v-card>
    </v-col>
    <v-col>
      <div class="d-flex justify-center">
        <v-btn
          small
          color="amber darken-2"
          class="white--text"
          @click="openPaymentGateway"
          :loading="loading"
        >
          {{ payCrypto }}
          <v-icon class="ml-1"> mdi-bitcoin</v-icon>
          <v-icon> mdi-ethereum </v-icon>
        </v-btn>
      </div>
      <div class="d-flex justify-center">
        <v-alert
          width="200px"
          color="indigo"
          class="mt-5 caption font-weight-light"
          dense
          outlined
          type="info"
        >
          {{ alertBeforePay }}
        </v-alert>
      </div>
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
  alertBeforePay = "After payment you will be redirected to bodechufe";
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

  mounted() {
    this.translate();
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
        case "alertBeforePay": {
          this.alertBeforePay = term.termTranslation;
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
