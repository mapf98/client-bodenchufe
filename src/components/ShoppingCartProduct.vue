<template>
  <v-card class="pl-3">
    <v-row>
      <v-col :cols="selectButtonResponsive()">
        <v-btn
          width="100%"
          height="100%"
          x-small
          color="amber darken-4"
          @click="
            updateStatusProduct(
              product.product_provider_order_id,
              product.status_name === 'SELECTED' ? 'UNSELECTED' : 'SELECTED'
            )
          "
        >
          <v-icon color="white" v-if="product.status_name == 'SELECTED'"
            >mdi-check</v-icon
          >
        </v-btn>
      </v-col>
      <v-col :cols="2" class="d-flex align-center">
        <v-list-item-avatar tile size="130">
          <v-img :src="product.product_photo"></v-img>
        </v-list-item-avatar>
      </v-col>
      <v-col :cols="productDetailResponsive()">
        <v-card-title class="display-1">{{
          product.product_name
        }}</v-card-title>
        <v-card-text class="subtitle-1 mt-n5">{{
          product.provider_name
        }}</v-card-text>
        <v-card-text class="subtitle-1 mt-n4"
          >{{ volumetricWeight }}: {{ product.volumetric_weight }} KG /
          {{ unit }}
        </v-card-text>
        <v-card-text class="subtitle-1 d-flex align-center mt-n5"
          >{{ quantity }}: {{ product.product_provider_order_quantity }}
          <v-btn
            text
            icon
            color="amber darken-4"
            @click="
              updateQuantityProduct(
                product.product_provider_order_id,
                product.product_provider_order_quantity + 1
              )
            "
          >
            <v-icon>mdi-plus-circle</v-icon>
          </v-btn>
          <v-btn
            class="ma-2 mr-5"
            text
            icon
            color="amber darken-4"
            @click="
              updateQuantityProduct(
                product.product_provider_order_id,
                product.product_provider_order_quantity - 1
              )
            "
          >
            <v-icon>mdi-do-not-disturb</v-icon>
          </v-btn>
        </v-card-text>
        <v-card-text
          class="d-flex align-center mt-n10 font-weight-light body-1 indigo--text"
        >
          {{ inStock }} {{ product.product_provider_available_quantity }}
        </v-card-text>
      </v-col>
      <v-col class="mt-n6">
        <v-row>
          <v-col :cols="productPriceResponsive()">
            <v-card-text
              class="display-1 d-flex justify-end font-weight-bold indigo--text ml-n4"
              >{{ productPrice() }} $</v-card-text
            >
            <v-card-text
              v-if="product.discount != null"
              class="d-flex justify-end font-weight-light body-1 success--text mt-n5"
            >
              {{ product.discount }} {{ discount }} {{ included }}
            </v-card-text>
          </v-col>
          <v-col class="d-flex align-center justify-end">
            <v-btn
              :class="deleteButtonResponsive()"
              text
              icon
              color="red lighten-1"
              @click="deleteProduct(product.product_provider_order_id)"
            >
              <v-icon x-large>mdi-delete-circle</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";

@Component({})
export default class ShoppingCart extends Vue {
  quantity = "Quantity";
  discount = "Off";
  included = "included";
  volumetricWeight = "Volumetric weight";
  unit = "unit";
  inStock = "In stock:";

  @Prop() product!: any;

  selectButtonResponsive() {
    const { xs, sm } = this.$vuetify.breakpoint;
    return xs || sm ? 3 : 1;
  }

  productDetailResponsive() {
    const { xs, sm } = this.$vuetify.breakpoint;
    return xs || sm ? 12 : 6;
  }

  productPriceResponsive() {
    const { xs, sm } = this.$vuetify.breakpoint;
    return xs || sm ? 8 : 12;
  }

  productPriceDiscountResponsive() {
    const { xs, sm } = this.$vuetify.breakpoint;
    return xs || sm ? 4 : 12;
  }

  deleteButtonResponsive() {
    const { xs, sm } = this.$vuetify.breakpoint;
    return xs || sm ? "mr-5" : "mr-5 mt-12";
  }

  productPrice() {
    if (this.product.discount == null)
      return Math.round(this.product.product_provider_price * 100) / 100;
    else
      return (
        Math.round(
          this.product.product_provider_price *
            (1 - this.product.discount.split("%")[0] / 100) *
            100
        ) / 100
      );
  }

  mounted() {
    this.translate();
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
        case "shoppingCartDiscount": {
          this.discount = term.termTranslation;
          break;
        }
        case "discountIncluded": {
          this.included = term.termTranslation;
          break;
        }
        case "volumetricWeight": {
          this.volumetricWeight = term.termTranslation;
          break;
        }
        case "unit": {
          this.unit = term.termTranslation;
          break;
        }
        case "productStock": {
          this.inStock = term.termTranslation;
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

  deleteProduct(productId: number) {
    this.$store
      .dispatch("shoppingCart/deleteShoppingCartProducts", {
        productId,
      })
      .then(() => {
        this.$store.dispatch("shoppingCart/getShoppingCartProducts");
      });
  }

  updateQuantityProduct(productId: number, quantity: number) {
    this.$store
      .dispatch("shoppingCart/updateQuantityProduct", {
        productId,
        quantity,
      })
      .then(() => {
        this.$store.dispatch("shoppingCart/getShoppingCartProducts");
      });
  }

  updateStatusProduct(productId: number, status: any) {
    this.$store
      .dispatch("shoppingCart/updateProductStatus", {
        productId,
        status,
      })
      .then(() => {
        this.$store.dispatch("shoppingCart/getShoppingCartProducts");
      });
  }
}
</script>

<style lang="scss"></style>
