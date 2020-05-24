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
                type="number"
                required
                :rules="addressZipRules"
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
                    :disabled="!allFields || !edit"
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
import { Prop, Watch } from "vue-property-decorator";

@Component({})
export default class UserAddress extends Vue {
  @Prop() userAddress!: any;
  snackbarError = false;
  errors: Array<string> = [];
  address = this.userAddress;

  edit = false;
  update = false;
  allFields = false;
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
  zipCodeLengthText = "Zip Code must be valid";

  addressRules = [(v: any) => !!v || this.addressRulesRequired];
  addressZipRules = [
    (v: any) => !!v || this.addressRulesRequired,
    (v: any) => (v.length <= 5 && v.length >= 5) || this.zipCodeLengthText,
  ];

  mounted() {
    this.translate();
    if (this.userAddress.delivery_address_aditional_info == "null") {
      this.userAddress.delivery_address_aditional_info = "";
    }
    if (this.userAddress.delivery_address_secondary_line == "null") {
      this.userAddress.delivery_address_secondary_line = "";
    }
  }

  @Watch("address.delivery_address_primary_line")
  @Watch("address.delivery_address_city")
  @Watch("address.delivery_address_state")
  @Watch("address.delivery_address_zip_code")
  disableChangeInfoButton() {
    if (
      this.address.delivery_address_zip_code.toString().length > 5 ||
      this.address.delivery_address_zip_code.toString().length < 5 ||
      this.address.delivery_address_state.length == 0 ||
      this.address.delivery_address_city.length == 0 ||
      this.address.delivery_address_primary_line.length == 0
    ) {
      this.allFields = false;
    } else {
      this.allFields = true;
    }
  }

  @Watch("translator")
  translate() {
    this.translator.forEach((term: any) => {
      switch (term.termName) {
        case "primaryLineText": {
          this.primaryLineText = term.termTranslation;
          break;
        }
        case "secondaryLineText": {
          this.secondaryLineText = term.termTranslation;
          break;
        }
        case "cityText": {
          this.cityText = term.termTranslation;
          break;
        }
        case "stateText": {
          this.stateText = term.termTranslation;
          break;
        }
        case "zipCodeText": {
          this.zipCodeText = term.termTranslation;
          break;
        }
        case "aditionalInfoText": {
          this.aditionalInfoText = term.termTranslation;
          break;
        }
        case "saveChangeSuccefullyText": {
          this.saveChangeSuccefullyText = term.termTranslation;
          break;
        }
        case "addressNotValidText": {
          this.addressNotValidText = term.termTranslation;
          break;
        }
        case "editButtonText": {
          this.editButtonText = term.termTranslation;
          break;
        }
        case "deleteButtonText": {
          this.deleteButtonText = term.termTranslation;
          break;
        }
        case "cancelButtonText": {
          this.cancelButtonText = term.termTranslation;
          break;
        }
        case "acceptButtonText": {
          this.acceptButtonText = term.termTranslation;
          break;
        }
        case "addressRulesRequired": {
          this.addressRulesRequired = term.termTranslation;
          break;
        }
        case "addressText": {
          this.addressText = term.termTranslation;
          break;
        }
        case "zipCodeLengthText": {
          this.zipCodeLengthText = term.termTranslation;
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
