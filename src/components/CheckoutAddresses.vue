<template>
  <v-card color="indigo">
    <v-card-text class="subtitle-1 white--text font-weight-black">
      Primary line
    </v-card-text>
    <v-card-text class="mt-n9 white--text font-weight-thin">
      {{ address.delivery_address_primary_line }}
    </v-card-text>
    <v-card-text class="subtitle-1 white--text mt-n6 font-weight-black">
      Secondary line
    </v-card-text>
    <v-card-text class="mt-n9 white--text font-weight-thin">
      emerahdnk
    </v-card-text>
    <v-card-text class="subtitle-1 white--text mt-n6 font-weight-black">
      City
    </v-card-text>
    <v-card-text class="mt-n9 white--text font-weight-thin">
      {{ address.delivery_address_city }}
    </v-card-text>
    <v-card-text class="subtitle-1 white--text mt-n6 font-weight-black">
      State
    </v-card-text>
    <v-card-text class="mt-n9 white--text font-weight-thin">
      {{ address.delivery_address_state }}
    </v-card-text>
    <v-card-text class="subtitle-1 white--text mt-n6 font-weight-black">
      Zip code
    </v-card-text>
    <v-card-text class="mt-n9 white--text font-weight-thin">
      {{ address.delivery_address_zip_code }}
    </v-card-text>

    <v-row class="d-flex justify-center pb-5">
      <v-btn> Select </v-btn>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";

@Component({})
export default class CheckoutAddresses extends Vue {
  quantity = "Quantity";
  discount = "Off";
  included = "included";

  @Prop() address!: object;

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
}
</script>

<style lang="scss"></style>
