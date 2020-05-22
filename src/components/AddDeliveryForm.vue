<template>
  <v-container>
    <v-row class="d-flex justify-center pa-12">
      <v-col :cols="separatorCols()">
        <v-text-field
          type="text"
          required
          v-model="userAddress.deliveryAddressPrimaryLine"
          :rules="addressRules"
          :label="primaryLineText"
        ></v-text-field>
        <v-text-field
          type="text"
          v-model="userAddress.deliveryAddressSecodaryLine"
          required
          :label="secondaryLineText"
        ></v-text-field>
        <v-text-field
          type="text"
          required
          v-model="userAddress.deliveryAddressCity"
          :rules="addressRules"
          :label="cityText"
        ></v-text-field>
      </v-col>
      <v-col :cols="separatorCols()">
        <v-text-field
          type="text"
          required
          v-model="userAddress.deliveryAddressState"
          :rules="addressRules"
          :label="stateText"
        ></v-text-field>
        <v-text-field
          type="number"
          required
          v-model="userAddress.deliveryAddressZipCode"
          :rules="addressZipRules"
          :label="zipCodeText"
        ></v-text-field>
        <v-text-field
          type="text"
          required
          v-model="userAddress.deliveryAddressAditionalInfo"
          :label="aditionalInfoText"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="d-flex justify-center">
        <v-btn
          :disabled="!allFields"
          color="indigo"
          class="white--text"
          @click="addAddress()"
          >{{ this.acceptButtonText }}</v-btn
        >
      </v-col>
    </v-row>
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
import { Watch } from "vue-property-decorator";

@Component({})
export default class AddDeliveryForm extends Vue {
  addressRulesRequired = "required";
  primaryLineText = "Primary Line";
  secondaryLineText = "Secondary Line";
  cityText = "City";
  stateText = "State";
  zipCodeText = "Zip Code";
  zipCodeLengthText = "Zip Code must be valid";
  aditionalInfoText = "Aditional info";
  addressSuccessfullyAddedText = "Address successfully added";
  addressNotValidText = "Address not valid";
  acceptButtonText = "accept";
  allFields = false;
  addressRules = [(v: any) => !!v || this.addressRulesRequired];
  addressZipRules = [
    (v: any) => !!v || this.addressRulesRequired,
    (v: any) => (v.length <= 5 && v.length >= 5) || this.zipCodeLengthText,
  ];

  snackbarError = false;
  errors: Array<string> = [];

  userAddress: any = {
    deliveryAddressAditionalInfo: null,
    deliveryAddressZipCode: "",
    deliveryAddressState: "",
    deliveryAddressCity: "",
    deliveryAddressSecondaryLine: null,
    deliveryAddressPrimaryLine: "",
    deliveryAddressSecurityCode: null,
    deliveryAddressLockerCode: null,
  };

  @Watch("userAddress.deliveryAddressPrimaryLine")
  @Watch("userAddress.deliveryAddressCity")
  @Watch("userAddress.deliveryAddressState")
  @Watch("userAddress.deliveryAddressZipCode")
  disableChangeInfoButton() {
    if (
      this.userAddress.deliveryAddressZipCode.toString().length > 5 ||
      this.userAddress.deliveryAddressZipCode.toString().length < 5 ||
      this.userAddress.deliveryAddressState.length == 0 ||
      this.userAddress.deliveryAddressCity.length == 0 ||
      this.userAddress.deliveryAddressPrimaryLine.length == 0
    ) {
      this.allFields = false;
    } else {
      this.allFields = true;
    }
  }

  get statusVerified() {
    return this.$store.getters["address/getStatusVerified"];
  }

  showErrors(errors: any) {
    this.errors = errors;
    this.snackbarError = true;
  }

  separatorCols() {
    const { xs, sm } = this.$vuetify.breakpoint;
    return xs || sm ? 12 : 6;
  }

  addAddress() {
    this.$store
      .dispatch("address/addAddress", {
        userAddress: this.userAddress,
      })
      .then(() => {
        if (this.statusVerified == false) {
          this.errors.splice(0);
          this.errors.push(this.addressNotValidText);
          this.showErrors(this.errors);
        } else {
          this.errors.splice(0);
          this.errors.push(this.addressSuccessfullyAddedText);
          this.showErrors(this.errors);
          this.$router.push("/delivery");
        }
      });
  }

  mounted() {
    this.translate();
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
        case "addressNotValidText": {
          this.addressNotValidText = term.termTranslation;
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
}
</script>

<style lang="scss"></style>
