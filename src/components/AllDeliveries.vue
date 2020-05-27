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
    <v-row>
      <v-col>
        <div v-if="(userAddresses.length === 0)" class="mt-12">
          <p class="mb-0 mt-12 indigo--text title text-center">
            {{ notAddresses }}
          </p>
          <div class="d-flex justify-center mt-6 mb-12">
            <v-icon color="indigo" x-large>
              mdi-magnify-remove-outline
            </v-icon>
          </div>
        </div>
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
  notAddresses = "there is no added address";

  get addresses() {
    return this.$store.getters["address/getAddresses"];
  }

  get translator() {
    return this.$store.getters["internationalization/getLanguageTexts"];
  }

  @Watch("translator")
  translate() {
    this.translator.forEach((term: any) => {
      switch (term.termName) {
        case "notAddresses": {
          this.notAddresses = term.termTranslation;
          break;
        }
        default: {
          break;
        }
      }
    });
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
    this.translate();
  }
}
</script>

<style lang="scss"></style>
