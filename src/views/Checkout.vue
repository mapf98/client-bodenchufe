<template>
  <v-container>
    <v-row>
      <v-col class="d-flex justify-center">
        <v-img src="../assets/logoBodenchufe.png" max-width="300"></v-img>
      </v-col>
    </v-row>

    <v-row>
      <v-col class="d-flex justify-start text-center">
        <v-btn
          text
          color="indigo"
          class="white--text text-center"
          @click="goToShoppingCart()"
          ><v-icon class="mr-2">mdi-backspace-outline</v-icon
          >{{ comeBack }}</v-btn
        >
      </v-col>
    </v-row>

    <v-stepper color="grey lighten-1" v-model="e6" vertical>
      <v-stepper-step :complete="e6 > 1" step="1">
        {{ selectShippingAddress }}
      </v-stepper-step>

      <v-stepper-content step="1">
        <v-card color="grey lighten-2" class="mb-12 pr-4" tile>
          <v-row class="ml-2">
            <v-col
              v-for="address in addresses"
              :key="address.delivery_address_id"
              cols="12"
              md="6"
              lg="3"
            >
              <CheckoutAddresses
                :address="address"
                :addressIdSelected="addressId"
                v-on:orderAddressId="orderAddressId"
              />
            </v-col>
          </v-row>
        </v-card>
        <div class="d-flex justify-center">
          <v-btn
            v-if="addressId > -1"
            color="amber darken-4"
            class="white--text"
            @click="getCouponsForOrder"
          >
            {{ Continue }}
          </v-btn>
        </div>
      </v-stepper-content>

      <v-stepper-step :complete="e6 > 2" step="2">
        {{ selectCoupon }}</v-stepper-step
      >

      <v-stepper-content step="2">
        <v-card color="grey lighten-2" class="mb-12 pr-4" tile>
          <v-card-text class="subtitle-1" v-if="coupons.length == 0">
            {{ noAvailableCoupons }}</v-card-text
          >
          <v-row class="ml-2">
            <v-col
              v-for="coupon in coupons"
              :key="coupon.coupon_id"
              cols="12"
              md="6"
              lg="3"
            >
              <CheckoutCoupons
                :coupon="coupon"
                :couponIdSelected="couponId"
                v-on:orderCouponId="orderCouponId"
                v-on:orderCouponRate="orderCouponRate"
              />
            </v-col>
          </v-row>
        </v-card>
        <div class="d-flex justify-center flex-wrap">
          <v-btn
            color="amber darken-4"
            class="white--text my-1"
            @click="e6 = 3"
            >{{ Continue }}</v-btn
          >
          <v-btn outlined @click="e6 = 1" class="my-1 mx-3">{{
            Previous
          }}</v-btn>
        </div>
      </v-stepper-content>

      <v-stepper-step :complete="e6 > 3" step="3"
        >{{ payOrder }}
      </v-stepper-step>

      <v-stepper-content step="3">
        <v-card
          v-if="paymentObtained"
          color="grey lighten-2"
          class="mb-12"
          tile
        >
          <CheckoutPayment
            :paymentDetail="paymentDetail"
            :addressId="addressId"
            :couponId="couponId"
            :couponRate="couponRate"
          />
        </v-card>
        <div class="d-flex justify-center">
          <v-btn outlined @click="e6 = 2">{{ Previous }}</v-btn>
        </div>
      </v-stepper-content>
    </v-stepper>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import CheckoutAddresses from "../components/CheckoutAddresses.vue";
import CheckoutCoupons from "../components/CheckoutCoupons.vue";
import CheckoutPayment from "../components/CheckoutPayment.vue";
import { Watch } from "vue-property-decorator";

@Component({
  components: {
    CheckoutAddresses,
    CheckoutCoupons,
    CheckoutPayment,
  },
})
export default class Checkout extends Vue {
  selectShippingAddress = "Select your shipping address";
  selectCoupon = "Select a discount coupon";
  Continue = "Continue";
  Previous = "Previous";
  payOrder = "Pay order";
  comeBack = "Come back to shopping cart";
  noAvailableCoupons =
    "You do not have any availble coupon for this order amount";
  totals = {
    subtotal: 0,
    weight: 0,
    quantity: 0,
  };
  e6 = 1;
  paymentObtained = false;

  //Los 3 atributos de abajo se usan para almacenar la informacion pasada desde los componentes hijos
  //Si no se pasa niguna informacion se quedan con los valores establecidos e indican que no se selecciono direccion ni cupon
  addressId = -1;
  couponId = -1;
  couponRate = "";

  orderAddressId(id: number) {
    this.addressId = id;
  }
  orderCouponId(id: number) {
    this.couponId = id;
  }

  goToShoppingCart() {
    this.$router.push("/shoppingCart");
  }

  orderCouponRate(rate: string) {
    this.couponRate = rate;
  }

  mounted() {
    this.translate();
    this.getAddresses();
    this.getPaymentDetail();
  }

  getAddresses() {
    this.$store.dispatch("address/getUserAddresses");
  }

  get addresses() {
    return this.$store.getters["address/getAddresses"];
  }

  getCouponsForOrder() {
    this.e6 = 2;
    this.$store.dispatch("coupon/getCouponsForOrder", {
      orderTotal: this.paymentDetail.orderSummary.subtotal,
    });
  }

  get coupons() {
    return this.$store.getters["coupon/getUserCouponsForOrder"];
  }

  getPaymentDetail() {
    this.$store.dispatch("checkout/getPaymentDetail").then(() => {
      this.paymentObtained = true;
    });
  }

  get paymentDetail() {
    return this.$store.getters["checkout/getPaymentDetail"];
  }

  @Watch("translator")
  translate() {
    this.translator.forEach((term: any) => {
      switch (term.termName) {
        case "continueText": {
          this.Continue = term.termTranslation;
          break;
        }
        case "previousText": {
          this.Previous = term.termTranslation;
          break;
        }
        case "payOrder": {
          this.payOrder = term.termTranslation;
          break;
        }
        case "selectCoupon": {
          this.selectCoupon = term.termTranslation;
          break;
        }
        case "selectShippingAddress": {
          this.selectShippingAddress = term.termTranslation;
          break;
        }
        case "noAvailableCoupons": {
          this.noAvailableCoupons = term.termTranslation;
          break;
        }
        case "comeBack": {
          this.comeBack = term.termTranslation;
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
