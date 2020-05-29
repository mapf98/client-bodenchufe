<template>
  <v-card class="pa-3 marginCard" elevation="5">
    <!-- <v-row>
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
    </v-row> -->
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
        <v-img :src="product.product_photo" contain height="200" width="200" ></v-img>
      </v-col>
      <v-col :cols="centerResponsive()">
        <p class="mb-0 display-1 text-center">{{ product.product_name }}</p>
        <p class="mb-0 subtitle-1 text-center">{{ product.provider_name }}</p>
        <div class="text-center">
          <p class="mb-0 subtitle-1">{{ volumetricWeight }}: {{ product.volumetric_weight }} KG / {{ unit }}</p>
          <div class="d-flex justify-center align-center">
            <p class="mb-0 subtitle-1">{{ quantity }}: {{ product.product_provider_order_quantity }}</p>
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
          <p class="mb-0 mt-3 font-weight-light body-1 indigo--text">{{ inStock }} {{ product.product_provider_available_quantity }}</p>
        </div>
      </v-col>
      <v-col :cols="sideResponsive2()">
        <v-row>
          <v-col>
            <p class="display-1 font-weight-bold indigo--text text-center">{{ productPrice() }} $</p>
            <p class="font-weight-light body-1 success--text text-center" v-if="product.discount != null">{{ product.discount }} {{ discount }} {{ included }}</p>
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
  
  imgResponsive(){
    const { xs, sm } = this.$vuetify.breakpoint;
    return xs || sm ? 12 : 3;
  }

  buttonH(){
    const { xs, sm } = this.$vuetify.breakpoint;
    return xs || sm ? 50 : 250;
  }

  // selectButtonResponsive() {
  //   const { xs, sm } = this.$vuetify.breakpoint;
  //   return xs || sm ? 3 : 1;
  // }

  // productDetailResponsive() {
  //   const { xs, sm } = this.$vuetify.breakpoint;
  //   return xs || sm ? 12 : 6;
  // }

  // productPriceResponsive() {
  //   const { xs, sm } = this.$vuetify.breakpoint;
  //   return xs || sm ? 8 : 12;
  // }

  // productPriceDiscountResponsive() {
  //   const { xs, sm } = this.$vuetify.breakpoint;
  //   return xs || sm ? 4 : 12;
  // }

  // deleteButtonResponsive() {
  //   const { xs, sm } = this.$vuetify.breakpoint;
  //   return xs || sm ? "mr-5" : "mr-5 mt-12";
  // }

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

<style lang="scss">
.marginCard{
  margin-left: 150px;
  margin-right: 150px;
}

@media (max-width: 575.98px) { 
  .marginCard{
    margin-left: 5px;
    margin-right: 5px;
  }
}

@media (min-width: 576px) and (max-width: 767.98px) { 
  .marginCard{
    margin-left: 30px;
    margin-right: 30px;
  }
}

@media (min-width: 768px) and (max-width: 991.98px) { 
  .marginCard{
    margin-left: 30px;
    margin-right: 30px;
  }
}

@media (min-width: 992px) and (max-width: 1199.98px) { 
  .marginCard{
    margin-left: 60px;
    margin-right: 60px;
  }
}

@media (min-width: 1200px) and (max-width: 1263px){
  .marginCard{
    margin-left: 30px;
    margin-right: 30px;
  }
}
</style>
