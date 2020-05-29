<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card color="#3949AB" tile>
          <v-row>
            <v-col>
              <v-card-text class="white--text display-1 ml-5">{{
                myShoppingCart
              }}</v-card-text>
            </v-col>
          </v-row>
          <v-row>
            <v-col :class="flexCols()">
              <v-card-text class="white--text title ml-4">Subtotal</v-card-text>
              <v-card-text :class="responsiveDetails()"
                >{{ totals.subtotal }}$</v-card-text
              >
            </v-col>
            <v-col :class="flexCols()">
              <v-card-text class="white--text title ml-4">{{
                totalWeight
              }}</v-card-text>
              <v-card-text :class="responsiveDetails()"
                >{{ totals.weight }} KG</v-card-text
              >
            </v-col>
            <v-col :class="flexCols()">
              <v-card-text class="white--text title ml-4">{{
                productsQuantity
              }}</v-card-text>
              <v-card-text :class="responsiveDetails()">{{
                totals.quantity
              }}</v-card-text>
            </v-col>
            <v-col>
              <v-col class="d-flex justify-center">
                <v-btn
                  x-large
                  v-if="totals.quantity > 0"
                  @click="goToCheckout"
                  >{{ checkout }}</v-btn
                >
              </v-col>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="justify-center mt-10 mb-6">
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
    <v-snackbar
      v-model="snackbarError"
      color="amber darken-4 px-3"
      class="mb-5 my-5"
      top
    >
      {{ noAddresses }}
      <v-btn @click="goToAddress()" small>
        {{ addText }}
      </v-btn>
    </v-snackbar>
    <v-row>
      <v-col>
        <div v-if="products.length === 0" class="mt-12">
          <p class="mb-0 mt-12 indigo--text title text-center">
            {{ noProducts }}
          </p>
          <div class="d-flex justify-center mt-6 mb-12">
            <v-icon color="indigo" x-large>
              mdi-magnify-remove-outline
            </v-icon>
          </div>
        </div>
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
  snackbarError = false;
  noAddresses = "You need to have a registered address to make the purchase";
  noProducts = "There are no products in the shopping cart";
  addText = "Add";

  flexCols() {
    const { xs, sm } = this.$vuetify.breakpoint;
    return xs || sm ? "d-flex align-center" : "";
  }

  responsiveDetails() {
    const { xs, sm } = this.$vuetify.breakpoint;
    const flex = "white--text headline font-weight-thin ml-4";
    const block = "white--text display-1 font-weight-thin mt-n8 ml-4";
    return xs || sm ? flex : block;
  }

  mounted() {
    this.getProducts();
    this.translate();
    window.scrollTo(0, 0);
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
        case "noProducts": {
          this.noProducts = term.termTranslation;
          break;
        }
        case "noAddresses": {
          this.noAddresses = term.termTranslation;
          break;
        }
        case "addText": {
          this.addText = term.termTranslation;
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

  goToCheckout() {
    this.$store.dispatch("address/getUserAddresses").then(() => {
      const addresses = this.$store.getters["address/getAddresses"];
      if (addresses.length == 0) {
        this.snackbarError = true;
        return;
      }
      this.$store.dispatch("checkout/createCheckout").then(() => {
        this.$router.push("/checkout");
      });
    });
  }

  goToAddress() {
    this.$router.push("/delivery/all");
  }
}
</script>

<style lang="scss"></style>
