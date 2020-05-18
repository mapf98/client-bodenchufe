<template>
  <v-container>
    <v-row class="align-center">
      <v-col class="text-center" cols="">
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
              ><v-icon class="mr-2">mdi-hand-left</v-icon> Change your
              password</v-btn
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
            >
              <v-icon class="mr-2">mdi-truck</v-icon> Delivery Address</v-btn
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
            >
              <v-icon class="mr-2">mdi-file-multiple</v-icon>Orders</v-btn
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
            >
              <v-icon class="mr-2">mdi-tag-multiple</v-icon>Coupons</v-btn
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
            >
              <v-icon class="mr-2">mdi-cart</v-icon> Shopping Cart</v-btn
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
import ProfileInfo from "../components/ProfileInfo.vue";

@Component({
  components: {
    ProfileInfo,
  },
})
export default class Profile extends Vue {
  buttonCols() {
    const { xs, sm } = this.$vuetify.breakpoint;
    return xs ? 280 : sm ? 280 : 350;
  }
  heigthCols() {
    const { xs, sm } = this.$vuetify.breakpoint;
    return xs ? 50 : sm ? 50 : 100;
  }
  goToShoppingCart() {
    this.$router.push("/shoppingCart");
  }
}
</script>

<style lang="scss"></style>
