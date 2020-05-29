<template>
  <v-card class="pa-3 mb-n10">
    <v-row class="d-flex align-center">
      <v-col :cols="sideResponsive1()" class="d-flex justify-center">
        <v-btn
          :height="buttonH()"
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
      <v-col :cols="imgResponsive()" class="d-flex justify-center">
        <v-img
          :src="product.product_photo"
          contain
          height="200"
          width="200"
        ></v-img>
      </v-col>
      <v-col :cols="centerResponsive()">
        <p class="mb-0 display-1 text-center">{{ product.product_name }}</p>
        <p class="mb-0 subtitle-1 text-center">{{ product.provider_name }}</p>
        <div class="text-center">
          <p class="mb-0 subtitle-1">
            {{ volumetricWeight }}: {{ product.volumetric_weight }} KG /
            {{ unit }}
          </p>
          <div class="d-flex justify-center align-center">
            <p class="mb-0 subtitle-1">
              {{ quantity }}: {{ product.product_provider_order_quantity }}
            </p>
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
          </div>
          <p class="mb-0 mt-3 font-weight-light body-1 indigo--text">
            {{ inStock }} {{ product.product_provider_available_quantity }}
          </p>
        </div>
      </v-col>
      <v-col :cols="sideResponsive2()">
        <v-row>
          <v-col>
            <p class="headline font-weight-bold indigo--text text-center">
              {{ productPrice() }} $
            </p>
            <p
              class="font-weight-light body-1 success--text text-center"
              v-if="product.discount != null"
            >
              {{ product.discount }} {{ discount }} {{ included }}
            </p>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="d-flex justify-center">
            <v-btn
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

  sideResponsive1() {
    const { xs, sm } = this.$vuetify.breakpoint;
    return xs || sm ? 12 : 1;
  }

  sideResponsive2() {
    const { xs, sm } = this.$vuetify.breakpoint;
    return xs || sm ? 12 : 2;
  }

  centerResponsive() {
    const { xs, sm } = this.$vuetify.breakpoint;
    return xs || sm ? 12 : 6;
  }

  imgResponsive() {
    const { xs, sm } = this.$vuetify.breakpoint;
    return xs || sm ? 12 : 3;
  }

  buttonH() {
    const { xs, sm } = this.$vuetify.breakpoint;
    return xs || sm ? 50 : 250;
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
    if (quantity <= this.product.product_provider_available_quantity)
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
