<template>
  <v-container fluid>
    <v-row class="align-center">
      <v-col class="text-center">
        <v-row>
          <v-col>
            <ProfileInfo />
          </v-col>
        </v-row>
      </v-col>
      <v-col class="text-center" cols="5">
        <v-row class="align-center mb-5">
          <v-col>
            <v-btn class="white--text" color="indigo" :width="buttonCols()"
              ><v-icon class="mr-2">mdi-lock</v-icon>
              {{ changePasswordButtonText }}</v-btn
            >
          </v-col>
        </v-row>
        <v-row class="align center">
          <v-col>
            <v-btn
              class="white--text"
              color="indigo darken-4"
              :width="buttonCols()"
              :height="heigthCols()"
              outlined
            >
              <v-icon class="mr-2">mdi-truck</v-icon>
              {{ deliveryAddressButtonText }}</v-btn
            >
          </v-col>
        </v-row>
        <v-row class="align center">
          <v-col>
            <v-btn
              class="white--text"
              color="indigo darken-4"
              :width="buttonCols()"
              :height="heigthCols()"
              outlined
            >
              <v-icon class="mr-2">mdi-file-multiple</v-icon
              >{{ ordersButtonText }}</v-btn
            >
          </v-col>
        </v-row>
        <v-row class="align center">
          <v-col>
            <v-btn
              class="white--text"
              color="indigo darken-4"
              :width="buttonCols()"
              :height="heigthCols()"
              outlined
            >
              <v-icon class="mr-2">mdi-tag-multiple</v-icon
              >{{ couponsButtonText }}</v-btn
            >
          </v-col>
        </v-row>
        <v-row class="align center">
          <v-col>
            <v-btn
              class="white--text mb-2"
              color="indigo darken-4"
              :width="buttonCols()"
              :height="heigthCols()"
              @click="goToShoppingCart()"
              outlined
            >
              <v-icon class="mr-2">mdi-cart</v-icon>
              {{ shoppingCartButtonText }}</v-btn
            >
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";
import ProfileInfo from "../components/ProfileInfo.vue";

@Component({
  components: {
    ProfileInfo,
  },
})
export default class Profile extends Vue {
  deliveryAddressButtonText = "Delivery address";
  ordersButtonText = "Orders";
  couponsButtonText = "Coupons";
  shoppingCartButtonText = "Shopping Cart";
  changePasswordButtonText = "Change your password";
  userDataProp = {};

  @Watch("translator")
  translate() {
    this.translator.forEach((term: any) => {
      switch (term.termName) {
        case "deliveryAddressButtonText": {
          this.deliveryAddressButtonText = term.termTranslation;
          break;
        }
        case "ordersButtonText": {
          this.ordersButtonText = term.termTranslation;
          break;
        }
        case "couponsButtonText": {
          this.couponsButtonText = term.termTranslation;
          break;
        }
        case "shoppingCartButtonText": {
          this.shoppingCartButtonText = term.termTranslation;
          break;
        }
        case "changePasswordButtonText": {
          this.changePasswordButtonText = term.termTranslation;
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

  mounted() {
    this.translator;
  }

  buttonCols() {
    const { xs, sm } = this.$vuetify.breakpoint;
    return xs ? 270 : sm ? 280 : 550;
  }
  heigthCols() {
    const { xs, sm } = this.$vuetify.breakpoint;
    return xs ? 50 : sm ? 90 : 100;
  }
  goToShoppingCart() {
    this.$router.push("/shoppingCart");
  }
}
</script>

<style lang="scss"></style>
