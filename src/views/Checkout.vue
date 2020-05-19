<template>
  <v-container>
    <v-row>
      <v-col class="d-flex justify-center">
        <router-link to="/home">
          <v-img src="../assets/logoBodenchufe.png" max-width="300"></v-img
        ></router-link>
      </v-col>
    </v-row>

    <v-stepper color="grey lighten-1" v-model="e6" vertical>
      <v-stepper-step :complete="e6 > 1" step="1">
        Select your shipping address
      </v-stepper-step>

      <v-stepper-content step="1">
        <v-card color="grey lighten-2" class="mb-12" tile>
          <v-row class="ml-2">
            <v-col
              v-for="address in addresses"
              :key="address.delivery_address_id"
              cols="12"
              md="6"
              lg="3"
            >
              <CheckoutAddresses :address="address" />
            </v-col>
          </v-row>
        </v-card>
        <v-btn color="amber darken-4" class="white--text" @click="e6 = 2"
          >Continue</v-btn
        >
      </v-stepper-content>

      <v-stepper-step :complete="e6 > 2" step="2"
        >Select a coupon discount</v-stepper-step
      >

      <v-stepper-content step="2">
        <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>
        <v-btn color="amber darken-4" class="white--text" @click="e6 = 3"
          >Continue</v-btn
        >
        <v-btn outlined class="ml-4" @click="e6 = 1">Previous</v-btn>
      </v-stepper-content>

      <v-stepper-step :complete="e6 > 3" step="3">Pay order</v-stepper-step>

      <v-stepper-content step="3">
        <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>
        <v-btn outlined @click="e6 = 2">Previous</v-btn>
      </v-stepper-content>
    </v-stepper>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import CheckoutAddresses from "../components/CheckoutAddresses.vue";
import { Watch } from "vue-property-decorator";

@Component({
  components: {
    CheckoutAddresses,
  },
})
export default class Checkout extends Vue {
  myShoppingCart = "My shopping cart";
  totalWeight = "Volumetric total weight";
  productsQuantity = "Products quantity";
  checkout = "Checkout";
  totals = {
    subtotal: 0,
    weight: 0,
    quantity: 0,
  };
  e6 = 1;

  mounted() {
    this.getAddresses();
  }

  getAddresses() {
    this.$store.dispatch("address/getUserAddresses");
  }

  get addresses() {
    return this.$store.getters["address/getAddresses"];
  }

  // @Watch("products")
  // reloadProducts() {
  //this.calculateTotals();
  //  }

  /* calculateTotals() {
    (this.totals.subtotal = 0),
      (this.totals.weight = 0),
      (this.totals.quantity = 0);
    this.products.forEach((product: any) => {
      if (product.status_name === "SELECTED") {
        (this.totals.subtotal += product.total),
          (this.totals.weight +=
            product.volumetric_weight *
            product.product_provider_order_quantity),
          (this.totals.quantity += product.product_provider_order_quantity);
        this.totals.weight = Math.round(this.totals.weight * 100) / 100;
        this.totals.subtotal = Math.round(this.totals.subtotal * 100) / 100;
      }
    });
  }*/

  @Watch("translator")
  translate() {
    this.translator.forEach((term: any) => {
      switch (term.termName) {
        case "myShoppingCart": {
          this.myShoppingCart = term.termTranslation;
          break;
        }
        case "shoppingCartTotalWeight": {
          this.totalWeight = term.termTranslation;
          break;
        }
        case "shoppingCartProductsQuantity": {
          this.productsQuantity = term.termTranslation;
          break;
        }
        case "shoppingCartCheckout": {
          this.checkout = term.termTranslation;
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
