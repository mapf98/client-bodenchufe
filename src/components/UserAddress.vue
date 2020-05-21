<template>
  <v-container>
    <v-expansion-panels multiple focusable hover>
      <v-expansion-panel>
        <v-expansion-panel-header
          class="white--text pa-2"
          expand-icon="mdi-menu-down"
          color="indigo"
        >
          <h2 class="ml-5">
            {{ addressText }}: {{ address.delivery_address_primary_line }}
          </h2>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row class="align-center">
            <v-col :cols="separatorCols()">
              <v-text-field
                type="text"
                required
                :rules="addressRules"
                :label="primaryLineText"
                v-model="address.delivery_address_primary_line"
                :disabled="!edit"
              ></v-text-field>
              <v-text-field
                type="text"
                required
                :label="secondaryLineText"
                v-model="address.delivery_address_secondary_line"
                :disabled="!edit"
              ></v-text-field>
              <v-text-field
                type="text"
                required
                :rules="addressRules"
                :label="cityText"
                v-model="address.delivery_address_city"
                :disabled="!edit"
              ></v-text-field>
              <v-text-field
                type="text"
                required
                :rules="addressRules"
                :label="stateText"
                v-model="address.delivery_address_state"
                :disabled="!edit"
              ></v-text-field>
              <v-text-field
                type="text"
                required
                :rules="addressRules"
                :label="zipCodeText"
                v-model="address.delivery_address_zip_code"
                :disabled="!edit"
              ></v-text-field>
              <v-text-field
                type="text"
                required
                :label="aditionalInfoText"
                v-model="address.delivery_address_aditional_info"
                :disabled="!edit"
              ></v-text-field>
            </v-col>
            <v-col :cols="separatorCols()">
              <v-row>
                <v-col class="text-center">
                  <v-btn
                    min-width="200"
                    color="indigo"
                    outlined
                    @click="edit = true"
                  >
                    <v-icon class="mr-2">mdi-file-multiple</v-icon>
                    {{ this.editButtonText }}
                  </v-btn>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="text-center">
                  <v-btn
                    min-width="200"
                    color="indigo"
                    outlined
                    :disabled="!edit"
                    @click="editAddress()"
                  >
                    <v-icon>mdi-check-bold</v-icon>
                    {{ this.acceptButtonText }}
                  </v-btn>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="text-center">
                  <v-btn
                    min-width="200"
                    color="indigo"
                    outlined
                    :disabled="!edit"
                    @click="edit = false"
                  >
                    <v-icon class="mr-2">x</v-icon>
                    {{ this.cancelButtonText }}
                  </v-btn>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="text-center">
                  <v-btn
                    min-width="200"
                    color="red"
                    outlined
                    @click="deleteAddress()"
                  >
                    <v-icon>mdi-trash-can-outline</v-icon>
                    {{ this.deleteButtonText }}
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-snackbar
      v-model="snackbarError"
      color="indigo darken-4 px-3"
      class="mb-5 my-5"
      top
    >
      <ul>
        <li class="body-1" v-for="error in errors" :key="error.id">
          {{ error }}
        </li>
      </ul>
      <v-btn color="amber" text @click="snackbarError = false" small>
        Close
      </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Component({})
export default class UserAddress extends Vue {
  @Prop() userAddress!: any;
  snackbarError = false;
  errors: Array<string> = [];
  address = this.userAddress;

  edit = false;
  update = false;
  primaryLineText = "Primary Line";
  secondaryLineText = "Secondary Line";
  cityText = "City";
  stateText = "State";
  zipCodeText = "Zip Code";
  aditionalInfoText = "Aditional info";
  addressText = "Address";
  addressRulesRequired = "required";
  acceptButtonText = "accept";
  cancelButtonText = "cancel";
  deleteButtonText = "delete";
  editButtonText = "edit";

  saveChangeSuccefullyText = "Your changes has been saved";
  addressNotValidText = "Address not valid";

  addressRules = [(v: any) => !!v || this.addressRulesRequired];

  mounted() {
    if (this.userAddress.delivery_address_aditional_info == "null") {
      // eslint-disable-next-line @typescript-eslint/camelcase
      this.userAddress.delivery_address_aditional_info = "";
    }
    if (this.userAddress.delivery_address_secondary_line == "null") {
      // eslint-disable-next-line @typescript-eslint/camelcase
      this.userAddress.delivery_address_secondary_line = "";
    }
  }

  deleteAddress() {
    this.$emit("deleteAddress", this.address.delivery_address_id);
  }

  showErrors(errors: any) {
    this.errors = errors;
    this.snackbarError = true;
  }

  separatorCols() {
    const { xs, sm } = this.$vuetify.breakpoint;
    return xs || sm ? 12 : 6;
  }

  get statusVerified() {
    return this.$store.getters["address/getStatusVerified"];
  }

  editAddress() {
    this.$store
      .dispatch("address/editAddress", {
        userAddress: this.address,
      })
      .then(() => {
        if (this.statusVerified == true) {
          this.errors.splice(0);
          this.errors.push(this.saveChangeSuccefullyText);
          this.showErrors(this.errors);
          this.update = true;
          this.$emit("update", this.update);
        } else {
          this.errors.splice(0);
          this.errors.push(this.addressNotValidText);
          this.showErrors(this.errors);
        }
      });
  }
}
</script>

<style lang="scss"></style>
