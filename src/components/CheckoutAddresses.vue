<template>
  <v-card color="indigo" :class="colors">
    <v-card-text class="subtitle-1 white--text font-weight-black">
      {{ primaryLine }}
    </v-card-text>
    <v-card-text class="mt-n9 white--text font-weight-thin">
      {{ address.delivery_address_primary_line }}
    </v-card-text>
    <v-card-text
      v-if="address.delivery_address_secondary_line != null"
      class="subtitle-1 white--text mt-n6 font-weight-black"
    >
      {{ secondaryLine }}
    </v-card-text>
    <v-card-text
      v-if="address.delivery_address_secondary_line != null"
      class="mt-n9 white--text font-weight-thin"
    >
      {{ address.delivery_address_secondary_line }}
    </v-card-text>
    <v-card-text class="subtitle-1 white--text mt-n6 font-weight-black">
      {{ city }}
    </v-card-text>
    <v-card-text class="mt-n9 white--text font-weight-thin">
      {{ address.delivery_address_city }}
    </v-card-text>
    <v-card-text class="subtitle-1 white--text mt-n6 font-weight-black">
      {{ state }}
    </v-card-text>
    <v-card-text class="mt-n9 white--text font-weight-thin">
      {{ address.delivery_address_state }}
    </v-card-text>
    <v-card-text class="subtitle-1 white--text mt-n6 font-weight-black">
      {{ zipCode }}
    </v-card-text>
    <v-card-text class="mt-n9 white--text font-weight-thin">
      {{ address.delivery_address_zip_code }}
    </v-card-text>

    <v-row class="d-flex justify-center pb-5">
      <v-btn @click="setAddress(address.delivery_address_id)" small>
        {{ select }}
      </v-btn>
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

  primaryLine = "Primary line";
  secondaryLine = "Secondary line";
  city = "City";
  state = "State";
  zipCode = "Zip code";
  select = "Select";

  selectedAddress = false;

  colors() {
    return {
      amber: this.selectedAddress,
    };
  }

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

  setAddress(id: number) {
    this.selectedAddress = !this.selectedAddress;
    this.$emit("orderAddressId", id);
  }

  get translator() {
    return this.$store.getters["internationalization/getLanguageTexts"];
  }
}
</script>

<style lang="scss"></style>
