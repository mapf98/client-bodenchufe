<template>
  <v-container>
    <v-row>
      <v-card width="100%" color="#3949AB" tile>
        <v-row>
          <v-card-text class="white--text display-1 ml-10">{{
            myShoppingCart
          }}</v-card-text>
        </v-row>
        <v-row>
          <v-col class="col-3">
            <v-card-text class="white--text title ml-10 d-block"
              >Subtotal</v-card-text
            >
            <v-card-text
              class="white--text display-1 ml-10 d-block font-weight-thin mt-n8"
              >{{ totals.subtotal }}$</v-card-text
            >
          </v-col>
          <v-col class="col-3">
            <v-card-text class="white--text title">{{
              totalWeight
            }}</v-card-text>
            <v-card-text
              class="white--text display-1 d-block font-weight-thin mt-n8"
              >{{ totals.weight }} KG</v-card-text
            >
          </v-col>
          <v-col class="col-3">
            <v-card-text class="white--text title">{{
              productsQuantity
            }}</v-card-text>
            <v-card-text
              class="white--text display-1 d-block font-weight-thin mt-n8"
              >{{ totals.quantity }}</v-card-text
            >
          </v-col>
          <v-col class="col-3">
            <v-col class="d-flex justify-center">
              <v-btn x-large v-if="totals.quantity > 0">{{ checkout }}</v-btn>
            </v-col>
          </v-col>
        </v-row>
      </v-card>
    </v-row>
    <v-row class="justify-center mt-10">
      <v-col
        v-for="product in products"
        :key="product.product_provider_order_id"
        cols="10"
        md="5"
        lg="10"
      >
        <shoppingCartProduct :product="product" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import ShoppingCartProduct from "../components/ShoppingCartProduct.vue";
import { Watch } from "vue-property-decorator";

@Component({
  components: {
    ShoppingCartProduct,
  },
})
export default class ShoppingCart extends Vue {
  myShoppingCart = "My shopping cart";
  totalWeight = "Volumetric total weight";
  productsQuantity = "Products quantity";
  checkout = "Checkout";
  totals = {
    subtotal: 0,
    weight: 0,
    quantity: 0,
  };

  mounted() {
    this.getProducts();
  }

  getProducts() {
    this.$store.dispatch("shoppingCart/getShoppingCartProducts");
  }

  get products() {
    return this.$store.getters["shoppingCart/getProducts"];
  }

  @Watch("products")
  reloadProducts() {
    this.calculateTotals();
  }

  calculateTotals() {
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
  }

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
