<template>
  <v-container>
    <v-alert type="warning" prominent border="left" class="subtitle-1">
      {{ info }}
      <p class="font-italic font-weight-light" color="indigo">
        {{ note }}
      </p>
    </v-alert>
    <v-row class="mt-12">
      <v-col class="">
        <v-card-text
          class="display-3 font-weight-bold d-flex justify-center indigo--text"
        >
          {{ thanks }}
        </v-card-text>
      </v-col>
    </v-row>
    <v-row class="d-flex">
      <v-col class="d-flex justify-center">
        <v-btn
          x-large
          color="amber darken-2"
          class="white--text d-flex justify-center"
        >
          {{ myOrders }}
          <v-icon class="ml-4">mdi-package-variant-closed</v-icon>
        </v-btn>
      </v-col>
      <v-col class="d-flex justify-center">
        <v-btn
          x-large
          color="amber darken-2"
          class="white--text"
          @click="goToHome"
        >
          {{ continueShopping }}
          <v-icon class="ml-4"> mdi-cart-outline</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-card height="50px" elevation="0"> </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";

@Component({})
export default class AfterPay extends Vue {
  thanks = "Thank you for trusting us!";
  myOrders = "My orders";
  continueShopping = "Continue shopping";
  info =
    "We will send you an email when the transaction has been fully confirmed";
  note =
    "Note: remember that the confirmations in the blockachin can take from a few minutes to hours";

  mounted() {
    this.translate();
  }

  goToHome() {
    this.$router.push("/home");
  }

  @Watch("translator")
  translate() {
    this.translator.forEach((term: any) => {
      switch (term.termName) {
        case "paySuccessInfo": {
          this.info = term.termTranslation;
          break;
        }
        case "noteSuccesInfo": {
          this.note = term.termTranslation;
          break;
        }
        case "thanksPayment": {
          this.thanks = term.termTranslation;
          break;
        }
        case "userOrders": {
          this.myOrders = term.termTranslation;
          break;
        }
        case "continueShopping": {
          this.continueShopping = term.termTranslation;
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
