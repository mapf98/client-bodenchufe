<template>
  <v-container class="mb-12">
    <v-card
      class="d-flex align-center flex-wrap"
      width="100%"
      color="#3949AB"
      tile
    >
      <v-col>
        <v-card-text class="white--text display-1">{{ myOrders }}</v-card-text>
      </v-col>
      <v-col cols="4">
        <v-select dense :items="years" label="Year" solo></v-select>
      </v-col>
    </v-card>
    <v-row class="justify-center">
      <v-col cols="10">
        <v-expansion-panels popout class="mt-12">
          <v-expansion-panel v-for="order in orders" :key="order.order_id">
            <v-expansion-panel-header
              class="title indigo--text d-flex flex-wrap"
            >
              <v-row class="mb-n6">
                <v-col class="d-flex align-center">
                  <p class="font-weight-bold">Order #{{ order.order_id }}</p>
                  <p class="body-1 ml-12">
                    {{ order.order_date.split("T")[0] }}
                  </p>
                </v-col>
                <v-col class="d-flex justify-end">
                  <p class="mr-12 black--text font-weight-light">
                    {{ order.order_amount_dollars }}$
                  </p>
                  <v-chip
                    outlined
                    small
                    :color="setStatusColor(order.status)"
                    :text-color="setStatusColor(order.status)"
                    class="mr-12"
                  >
                    <v-avatar left>
                      <v-icon small>{{ setStatusIcon(order.status) }}</v-icon>
                    </v-avatar>
                    {{ order.status }}
                  </v-chip>
                </v-col>
              </v-row>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <p v-if="order.coupon_rate != null" class="body-1 indigo--text">
                Cupon aplicado del {{ order.coupon_rate }}
              </p>
              <Product
                v-for="product in order.orderDetailProducts"
                :key="product.product_id"
                v-bind:product="product"
              />
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Product from "../components/orderHistoryProduct.vue";
import { Watch } from "vue-property-decorator";

@Component({
  components: {
    Product,
  },
})
export default class OrderHistory extends Vue {
  years = ["2020", "2019", "2018", "2017"];
  myOrders = "My orders";
  totalWeight = "Volumetric total weight";
  productsQuantity = "Products quantity";
  checkout = "Checkout";

  setStatusColor(status: any) {
    if (status == "PAID") return "teal darken-1";
    if (status == "IN PROCESS") return "lime darken-1";
    if (status == "REJECTED") return "deep-orange darken-4";
  }

  setStatusIcon(status: any) {
    if (status == "PAID") return "mdi-checkbox-marked-circle";
    if (status == "IN PROCESS") return "mdi-information";
    if (status == "REJECTED") return "mdi-close-circle";
  }

  mounted() {
    this.getOrders();
    window.scrollTo(0, 0);

    //this.translate();
  }

  getOrders() {
    this.$store.dispatch("orderHistory/getOrders");
  }

  get orders() {
    return this.$store.getters["orderHistory/getOrders"];
  }

  @Watch("translator")
  translate() {
    this.translator.forEach((term: any) => {
      switch (term.termName) {
        case "myShoppingCart": {
          this.totalWeight = term.termTranslation;
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
