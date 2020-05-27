<template>
  <v-container fluid>
    <v-row class="align-center d-flex justify-center">
      <v-col class="text-center">
        <v-row>
          <v-col>
            <ProfileInfo />
          </v-col>
        </v-row>
      </v-col>
      <v-col class="text-center">
        <v-row class="align-center mb-5">
          <v-col class="d-flex justify-center">
            <v-btn
              class="white--text"
              color="indigo"
              :width="buttonCols()"
              @click="goToChangePassword()"
              :disabled="isfederated"
              ><v-icon class="mr-2">mdi-lock</v-icon>
              {{ changePasswordButtonText }}</v-btn
            >
          </v-col>
        </v-row>
        <v-row class="align center">
          <v-col class="d-flex justify-center">
            <v-btn
              class="white--text"
              color="indigo darken-4"
              :width="buttonCols()"
              :height="heigthCols()"
              outlined
              @click="goToDeliveryAddress()"
            >
              <v-icon class="mr-2">mdi-truck</v-icon>
              {{ deliveryAddressButtonText }}</v-btn
            >
          </v-col>
        </v-row>
        <v-row class="align center">
          <v-col class="d-flex justify-center">
            <v-btn
              class="white--text"
              color="indigo darken-4"
              :width="buttonCols()"
              :height="heigthCols()"
              @click="goToOrders()"
              outlined
            >
              <v-icon class="mr-2">mdi-file-multiple</v-icon
              >{{ ordersButtonText }}</v-btn
            >
          </v-col>
        </v-row>
        <v-row class="align center">
          <v-col class="d-flex justify-center">
            <v-btn
              class="white--text"
              color="indigo darken-4"
              :width="buttonCols()"
              :height="heigthCols()"
              @click="goToCoupons()"
              outlined
            >
              <v-icon class="mr-2">mdi-tag-multiple</v-icon
              >{{ couponsButtonText }}</v-btn
            >
          </v-col>
        </v-row>
        <v-row class="align center">
          <v-col class="d-flex justify-center">
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
        <v-col class="d-flex justify-center">
          <v-btn
            class="white--text"
            color="red"
            :width="buttonCols()"
            @click="signOff()"
            text
            ><v-icon class="mr-2">mdi-logout</v-icon> {{ signOffText }}</v-btn
          >
        </v-col>
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
  signOffText = "Log out";
  userDataProp = {};
  accountType = "";
  isfederated = false;

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
        case "signOffText": {
          this.signOffText = term.termTranslation;
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
    const lsData: any = localStorage.getItem("userData");
    this.translate();
    this.accountType = JSON.parse(lsData).userType;
    if (this.accountType == "federated") {
      this.isfederated = true;
    }
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
  goToChangePassword() {
    this.$router.push("/changePassword");
  }
  goToHome() {
    this.$router.push("/home");
  }
  goToDeliveryAddress() {
    this.$router.push("/delivery/all");
  }
  goToCoupons() {
    this.$router.push("/coupons");
  }
  goToOrders() {
    this.$router.push("/orderHistory");
  }
  signOff() {
    localStorage.clear();
    this.$router.push("/home");
    location.reload();
  }
}
</script>

<style lang="scss"></style>
