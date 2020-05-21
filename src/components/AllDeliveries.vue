<template>
  <v-container fluid>
    <v-row v-for="address in userAddresses" :key="address.id">
      <v-col>
        <UserDelivery :userAddress="address" :toEdit="toEdit" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import UserDelivery from "../components/UserAddress.vue";

@Component({
  components: {
    UserDelivery,
  },
})
export default class AllDeliveries extends Vue {
  userAddresses = [];
  toEdit = false;

  getAllUserAddresses() {
    this.$store.dispatch("address/getUserAddresses").then(() => {
      this.userAddresses = this.addresses;
    });
  }

  get addresses() {
    return this.$store.getters["address/getAddresses"];
  }

  mounted() {
    this.getAllUserAddresses();
  }
}
</script>

<style lang="scss"></style>
