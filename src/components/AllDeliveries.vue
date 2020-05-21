<template>
  <v-container fluid>
    <v-row v-for="address in addresses" :key="address.delivery_address_id">
      <v-col>
        <UserDelivery
          :userAddress="address"
          @deleteAddress="deleteAddress"
          @update="update = $event"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import UserDelivery from "../components/UserAddress.vue";
import { Watch } from "vue-property-decorator";

@Component({
  components: {
    UserDelivery,
  },
})
export default class AllDeliveries extends Vue {
  userAddresses = [];
  update = false;

  get addresses() {
    return this.$store.getters["address/getAddresses"];
  }

  @Watch("update")
  getAllUserAddresses() {
    this.$store.dispatch("address/getUserAddresses").then(() => {
      this.userAddresses = this.addresses;
    });
  }

  @Watch("addresses")
  resetAddresses() {
    this.userAddresses = this.addresses;
  }

  deleteAddress(id: number) {
    this.$store
      .dispatch("address/deleteAddress", {
        deliveryAddressId: id,
        statusName: "INACTIVE",
      })
      .then(() => {
        this.$store.dispatch("address/getUserAddresses");
      });
  }

  mounted() {
    this.getAllUserAddresses();
  }
}
</script>

<style lang="scss"></style>
