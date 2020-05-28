<template>
  <v-container fluid>
    <v-row>
      <v-col class="d-flex justify-center text-center" :cols="separatorCols()">
        <v-btn
          color="indigo"
          class="white--text"
          width="200"
          :class="{ overline: $vuetify.breakpoint.xs }"
          :outlined="InAddressView == true"
          @click="goToMyAddresses()"
          >{{ myAddressesText }}</v-btn
        >
      </v-col>
      <v-col class="d-flex justify-center text-center" :cols="separatorCols()">
        <v-btn
          color="indigo"
          class="white--text text-center"
          width="200"
          :class="{ overline: $vuetify.breakpoint.xs }"
          :outlined="InAddView == true"
          @click="goToAddAddress()"
          >{{ addAddresText }}</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";

@Component({})
export default class DeliveryBar extends Vue {
  InAddressView = true;
  InAddView = false;

  addAddresText = "Add Address";
  myAddressesText = "My Addresses";

  separatorCols() {
    const { xs, sm } = this.$vuetify.breakpoint;
    return xs || sm ? 12 : 6;
  }
  goToMyAddresses() {
    this.InAddressView = true;
    this.InAddView = false;
    this.$router.currentRoute.path != "/delivery/all"
      ? this.$router.push("/delivery/all")
      : false;
  }
  goToAddAddress() {
    this.InAddView = true;
    this.InAddressView = false;
    this.$router.currentRoute.path != "/delivery/add"
      ? this.$router.push("/delivery/add")
      : false;
  }

  mounted() {
    this.translate();
  }

  @Watch("translator")
  translate() {
    this.translator.forEach((term: any) => {
      switch (term.termName) {
        case "addAddressText": {
          this.addAddresText = term.termTranslation;
          break;
        }
        case "myAddressesText": {
          this.myAddressesText = term.termTranslation;
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
