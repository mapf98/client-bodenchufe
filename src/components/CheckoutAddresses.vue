<template>
  <v-card color="indigo" @click="setAddress(address.delivery_address_id)">
    <v-row v-if="address.delivery_address_id === addressIdSelected">
      <v-col class="d-flex justify-center">
        <v-icon color="amber">
          > mdi-checkbox-marked-circle
        </v-icon>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card-text class="subtitle-1 white--text font-weight-black">
          {{ primaryLine }}
        </v-card-text>
        <v-card-text class="mt-n9 white--text font-weight-thin">
          {{ address.delivery_address_primary_line }}
        </v-card-text>
        <v-card-text
          v-if="address.delivery_address_secondary_line != 'null'"
          class="subtitle-1 white--text mt-n6 font-weight-black"
        >
          {{ secondaryLine }}
        </v-card-text>
        <v-card-text
          v-if="address.delivery_address_secondary_line != 'null'"
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
      </v-col>
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
  isAddressSelected = false;

  @Prop() address!: any;
  @Prop() addressIdSelected!: number;

  setAddress(id: number) {
    // Se valida si la direccion que se clickeo esta seleecionada y si el id de la direccion seleccionada
    //anteriormente es igual al actual. Si es afirmativo, quiere decir que este direccion estaba seleccionado y  ahora se deselecciono
    if (
      this.isAddressSelected &&
      this.$props.addressIdSelected === this.$props.address.delivery_address_id
    ) {
      this.isAddressSelected = false;
    } else if (
      this.isAddressSelected &&
      this.$props.addressIdSelected != this.$props.address.delivery_address_id
    ) {
      this.isAddressSelected = true;
    } else this.isAddressSelected = !this.isAddressSelected;

    if (!this.isAddressSelected) {
      //Si no hay ninguna direccion seleccionada se le pasa al padre un id negativo para indicar que no hay direccion seleccionada.
      id = -1;
    }
    this.$emit("orderAddressId", id);
  }

  @Watch("translator")
  translate() {
    this.translator.forEach((term: any) => {
      switch (term.termName) {
        case "selectText": {
          this.select = term.termTranslation;
          break;
        }
        case "primaryLineText": {
          this.primaryLine = term.termTranslation;
          break;
        }
        case "secondaryLineText": {
          this.secondaryLine = term.termTranslation;
          break;
        }
        case "cityText": {
          this.city = term.termTranslation;
          break;
        }
        case "stateText": {
          this.state = term.termTranslation;
          break;
        }
        case "zipCodeText": {
          this.zipCode = term.termTranslation;
          break;
        }
      }
    });
  }

  mounted() {
    this.translate();
  }

  get translator() {
    return this.$store.getters["internationalization/getLanguageTexts"];
  }
}
</script>

<style lang="scss"></style>
