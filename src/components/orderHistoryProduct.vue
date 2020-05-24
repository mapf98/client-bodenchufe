<template>
  <v-row>
    <v-col>
      <v-card class="d-flex flex-wrap" outlined>
        <v-col :cols="responsive()">
          <v-list-item-avatar tile size="130">
            <v-img :src="product.product_photo"></v-img>
          </v-list-item-avatar>
        </v-col>
        <v-col>
          <v-list-item-title class="headline mb-1">{{
            product.product_name
          }}</v-list-item-title>
          <div class="overline mb-4">{{ product.provider_name }}</div>
          <v-list-item-subtitle class="mb-7"
            >{{ product.product_provider_price }} $</v-list-item-subtitle
          >
          <v-list-item-subtitle
            >Cantidad:
            {{ product.product_provider_order_quantity }}</v-list-item-subtitle
          >
        </v-col>
        <v-col class="d-flex justify-end align-end">
          <v-btn color="amber darken-2" class="white--text" :loading="loading">
            Calificar producto
          </v-btn>
        </v-col>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import ShoppingCartProduct from "../components/ShoppingCartProduct.vue";
import { Prop, Watch } from "vue-property-decorator";

@Component({
  components: {
    ShoppingCartProduct,
  },
})
export default class OrderHistoryProduct extends Vue {
  @Prop() product!: any;

  myShoppingCart = "My shopping cart";
  totalWeight = "Volumetric total weight";
  productsQuantity = "Products quantity";
  checkout = "Checkout";
  totals = {
    subtotal: 0,
    weight: 0,
    quantity: 0,
  };

  responsive() {
    const { xs, sm } = this.$vuetify.breakpoint;
    return xs || sm ? 12 : 3;
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
    this.$store.dispatch("checkout/createCheckout").then(() => {
      this.$router.push("/checkout");
    });
  }
}
</script>

<style lang="scss"></style>
