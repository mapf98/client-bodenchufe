<template>
  <v-container fluid>
    <v-app-bar>
      <v-row>
        <v-col :cols="separatorCols()"></v-col>
        <v-col class="d-flex justify-center text-center">
          <v-btn
            color="indigo"
            class="white--text"
            :class="{ overline: $vuetify.breakpoint.xs }"
            :width="buttonCols()"
            :outlined="InAddressView == true"
            @click="goToMyAddresses()"
            >{{ myAddressesText }}</v-btn
          >
        </v-col>
        <v-col class="d-flex justify-center text-center">
          <v-btn
            color="indigo"
            class="white--text text-center"
            :class="{ overline: $vuetify.breakpoint.xs }"
            :width="buttonCols()"
            :outlined="InAddView == true"
            @click="goToAddAddress()"
            >{{ addAddresText }}</v-btn
          >
        </v-col>
        <v-col :cols="separatorCols()"></v-col>
      </v-row>
    </v-app-bar>
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

  buttonCols() {
    const { xs, sm } = this.$vuetify.breakpoint;
    return xs ? 105 : sm ? 280 : 210;
  }
  separatorCols() {
    const { xs, sm } = this.$vuetify.breakpoint;
    return xs || sm ? 12 : 3;
  }
  goToMyAddresses() {
    this.InAddressView = true;
    this.InAddView = false;
    this.$router.push("/delivery");
  }
  goToAddAddress() {
    this.InAddView = true;
    this.InAddressView = false;
    this.$router.push("/delivery/add");
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
