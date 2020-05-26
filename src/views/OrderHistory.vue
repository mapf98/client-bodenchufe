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
        <v-select
          @change="setYear"
          v-model="year"
          dense
          :items="years"
          label="Year"
          solo
        ></v-select>
      </v-col>
    </v-card>
    <v-row class="justify-center">
      <v-col cols="10">
        <v-expansion-panels popout class="mt-12">
          <v-expansion-panel
            v-for="order in selectOrder()"
            :key="order.order_id"
          >
            <v-expansion-panel-header
              class="title indigo--text d-flex flex-wrap"
            >
              <v-row class="mb-n6">
                <v-col class="d-flex align-center">
                  <p class="font-weight-bold">
                    {{ orderText }} #{{ order.order_id }}
                  </p>
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
                    {{ setStatusName(order.status) }}
                  </v-chip>
                </v-col>
              </v-row>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <div class="body-2 mb-4">{{ commission }}: (1.75% + 0.25$)</div>
              <p v-if="order.coupon_rate != null" class="body-2 indigo--text">
                {{ appliedCoupon }} {{ order.coupon_rate }}
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
    <v-row>
      <v-col>
        <div
          v-if="
            loaded == true && (orders.length === 0 || ordersFilter.length === 0)
          "
          class="mt-12"
        >
          <p class="mb-0 mt-12 indigo--text title text-center">
            {{ noOrders }}
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
import Product from "../components/orderHistoryProduct.vue";
import { Watch } from "vue-property-decorator";

@Component({
  components: {
    Product,
  },
})
export default class OrderHistory extends Vue {
  years = ["All years", "2020", "2019", "2018", "2017"];
  myOrders = "My orders";
  orderText = "Order";
  commission = "Commissions";
  appliedCoupon = "Applied coupon of";
  noOrders = "There are no orders placed in this time period";
  paidStatus = "PAID";
  rejectedStatus = "REJECTED";
  inProcessStatus = "IN PROCESS";
  year: any = "All years";
  ordersFilter = [""];
  loaded = false;

  selectOrder() {
    if (this.year == "All years") return this.orders;
    else return this.ordersFilter;
  }

  setYear() {
    let ordersArray: any = [];
    this.orders.forEach((el: any) => {
      if (this.year === el.order_date.split("-")[0]) {
        ordersArray.push(el);
      }
    });
    if (this.year == "All years") ordersArray = [""];
    this.ordersFilter = ordersArray;
  }

  setStatusName(status: any) {
    if (status == "PAID") return this.paidStatus;
    if (status == "IN PROCESS") return this.inProcessStatus;
    if (status == "REJECTED") return this.rejectedStatus;
  }

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
    this.translate();
  }

  getOrders() {
    this.$store.dispatch("orderHistory/getOrders").then(() => {
      this.loaded = true;
    });
  }

  get orders() {
    return this.$store.getters["orderHistory/getOrders"];
  }

  @Watch("translator")
  translate() {
    this.translator.forEach((term: any) => {
      switch (term.termName) {
        case "userOrders": {
          this.myOrders = term.termTranslation;
          break;
        }
        case "orderText": {
          this.orderText = term.termTranslation;
          break;
        }
        case "commissionsPay": {
          this.commission = term.termTranslation;
          break;
        }
        case "appliedCoupon": {
          this.appliedCoupon = term.termTranslation;
          break;
        }
        case "noOrders": {
          this.noOrders = term.termTranslation;
          break;
        }
        case "paidStatus": {
          this.paidStatus = term.termTranslation;
          break;
        }
        case "inProcessStatus": {
          this.inProcessStatus = term.termTranslation;
          break;
        }
        case "rejectedStatus": {
          this.rejectedStatus = term.termTranslation;
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
