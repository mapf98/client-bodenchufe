<template>
  <v-card>
    <div class="d-flex">
      <v-col class="col-1">
        <v-btn
          height="100%"
          width="100%"
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
      <v-col class="col-3">
        <v-img
          :src="product.product_photo"
          height="200"
          width="100%"
        ></v-img>
      </v-col>
      <v-col class="col-5">
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
      <v-col class="col-3">
        <v-card-text
          class="display-1 d-flex justify-end font-weight-bold indigo--text"
          >{{ productPrice() }} $</v-card-text
        >
        <v-card-text
          v-if="product.discount != null"
          class="d-flex justify-end font-weight-light body-1 indigo--text mt-n5"
        >
          {{ product.discount }} {{ discount }}
        </v-card-text>
        <v-card-text
          v-if="product.discount != null"
          class="d-flex justify-end font-weight-light body-1 indigo--text mt-n9"
        >
          {{ included }}
        </v-card-text>
        <v-row class="d-flex justify-end">
          <v-btn
            class="ma-2 mt-12 mr-5"
            text
            icon
            color="red lighten-1"
            @click="deleteProduct(product.product_provider_order_id)"
          >
            <v-icon x-large>mdi-delete-circle</v-icon>
          </v-btn>
        </v-row>
      </v-col>
    </div>
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

  productPrice() {
    if (this.product.discount == null)
      return this.product.product_provider_price;
    else
      return (
        this.product.product_provider_price *
        (1 - this.product.discount.split("%")[0] / 100)
      );
  }

  mounted() {
    this.translate();
    console.log(this.product);
    window.scrollTo(0,0);
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
