<template>
  <v-container>
    <v-row class="justify-center align-center">
      <v-col>
        <v-form>
          <v-text-field
            type="password"
            required
            v-model="userPasswordData.currentPassword"
            :label="userCurrentPasswordText"
            :rules="passwordRules"
          ></v-text-field>
          <v-text-field
            type="password"
            required
            v-model="userPasswordData.newPassword"
            :label="userNewPasswordText"
            :rules="passwordRules"
          ></v-text-field>
          <v-text-field
            type="password"
            required
            v-model="validatedPassword"
            :label="this.userConfirmPasswordText"
            :rules="passwordRules"
          ></v-text-field>
        </v-form>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="d-flex justify-center">
        <v-btn
          :width="buttonCols()"
          class="align-center white--text mt-12"
          color="indigo"
          :disabled="isfederated"
          @click="changePassword()"
          >{{ saveChangeText }}</v-btn
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
      <v-btn
        color="amber"
        text
        @click="
          snackbarError = false;
          goToprofile();
        "
        small
      >
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
export default class EditPassword extends Vue {
  saveChangeText = "Save your changes";
  userCurrentPasswordText = "Current Password";
  userNewPasswordText = "New Password";
  userConfirmPasswordText = "Confirm Password";
  userPasswordRulesRequired = "Password must be less than 8 characters";
  userPasswordRulesLength = "Password is required";
  incorrectCurrentPasswordText = "The current password is invalid";
  matchCurrentPasswordText = "Password confirmation does not match";
  passwordValidChangeText = "Password successfully changed";

  snackbarError = false;
  errors: Array<string> = [];
  validatedPassword = "";
  userPasswordData = {
    currentPassword: "",
    newPassword: "",
  };
  accountType = "";
  isfederated = false;

  passwordRules = [
    (v: any) => !!v || this.userPasswordRulesRequired,
    (v: any) => v.length >= 8 || this.userPasswordRulesLength,
  ];

  buttonCols() {
    const { xs, sm } = this.$vuetify.breakpoint;
    return xs ? 180 : sm ? 280 : 350;
  }

  mounted() {
    this.translate();
    this.errors.splice(0);
    const lsData: any = localStorage.getItem("userData");
    this.accountType = JSON.parse(lsData).userType;
    if (this.accountType == "federated") {
      this.isfederated = true;
    }
  }

  @Watch("translator")
  translate() {
    this.translator.forEach((term: any) => {
      switch (term.termName) {
        case "saveChangeText": {
          this.saveChangeText = term.termTranslation;
          break;
        }
        case "userCurrentPasswordText": {
          this.userCurrentPasswordText = term.termTranslation;
          break;
        }
        case "userNewPasswordText": {
          this.userNewPasswordText = term.termTranslation;
          break;
        }
        case "userConfirmPasswordText": {
          this.userConfirmPasswordText = term.termTranslation;
          break;
        }
        case "userPasswordRulesRequired": {
          this.userPasswordRulesRequired = term.termTranslation;
          break;
        }
        case "userPasswordRulesLength": {
          this.userPasswordRulesLength = term.termTranslation;
          break;
        }
        case "passwordValidChangeText": {
          this.passwordValidChangeText = term.termTranslation;
          break;
        }
        case "incorrectCurrentPasswordText": {
          this.incorrectCurrentPasswordText = term.termTranslation;
          break;
        }
        case "matchCurrentPasswordText": {
          this.matchCurrentPasswordText = term.termTranslation;
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  showErrors(errors: any) {
    this.errors = errors;
    this.snackbarError = true;
  }

  get translator() {
    return this.$store.getters["internationalization/getLanguageTexts"];
  }

  get passwordStatus() {
    return this.$store.getters["profile/getPasswordStatus"];
  }

  changePassword() {
    if (this.validatedPassword != this.userPasswordData.newPassword) {
      this.errors.push(this.matchCurrentPasswordText);
      this.showErrors(this.errors);
    } else {
      this.$store
        .dispatch("profile/changePassword", {
          userPasswordData: this.userPasswordData,
        })
        .then((res: any) => {
          if (this.passwordStatus.correct == true) {
            this.errors.splice(0);
            this.errors.push(this.passwordValidChangeText);
            this.showErrors(this.errors);
          } else {
            this.errors.splice(0);
            this.errors.push(this.incorrectCurrentPasswordText);
            this.showErrors(this.errors);
          }
        });
    }
    console.log(this.userPasswordData);
  }

  goToprofile() {
    this.$router.push("/profile");
  }
}
</script>

<style lang="scss"></style>
