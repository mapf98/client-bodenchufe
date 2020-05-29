<template>
  <v-row>
    <v-col>
      <v-card
        class="d-flex flex-wrap"
        outlined
        :loading="loading"
        @click="goToDetail(product.product_provider_id)"
      >
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
            >{{ getProductPrice() }} $</v-list-item-subtitle
          >
          <v-list-item-subtitle
            >{{ quantity }}:
            {{ product.product_provider_order_quantity }}</v-list-item-subtitle
          >
        </v-col>
        <v-col class="d-flex justify-end align-end">
          <RateProduct
            v-if="loadRate"
            :product="product"
            :alreadyRated="alreadyRated"
            @newRate="newRate"
          />
        </v-col>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import ShoppingCartProduct from "../components/ShoppingCartProduct.vue";
import RateProduct from "../components/RateProduct.vue";
import { Prop, Watch } from "vue-property-decorator";

@Component({
  components: {
    ShoppingCartProduct,
    RateProduct,
  },
})
export default class OrderHistoryProduct extends Vue {
  @Prop() product!: any;
  quantity = "Quantity";
  loading = false;
  loadRate = false;
  alreadyRated = false;

  newRate(status: boolean) {
    this.loadRate = true;

    this.alreadyRated = status;
  }

  checkProductAlreadyRated() {
    //let alreadyRated;
    this.$store
      .dispatch("orderHistory/checkProductAlreadyRated", {
        product_id: this.product.product_provider_id,
      })
      .then((res) => {
        this.loadRate = true;
        this.alreadyRated = res.data.alreadyRated;
      });
    //return alreadyRated;
  }

  getProductPrice() {
    if (this.product.discount != null) {
      return (
        Math.round(
          this.product.product_provider_price *
            (1 - this.product.discount.split("%")[0] / 100) *
            100
        ) / 100
      );
    }
    return Math.round(this.product.product_provider_price * 100) / 100;
  }

  goToDetail(postId: number) {
    this.loading = true;
    this.$router.push({
      name: "detail",
      params: { productId: postId.toString() },
    });
  }

  responsive() {
    const { xs, sm } = this.$vuetify.breakpoint;
    return xs || sm ? 12 : 3;
  }

  mounted() {
    this.translate();
    this.checkProductAlreadyRated();
    window.scrollTo(0, 0);
  }

  @Watch("translator")
  translate() {
    this.translator.forEach((term: any) => {
      switch (term.termName) {
        case "shoppingCartQuantity": {
          this.quantity = term.termTranslation;
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
