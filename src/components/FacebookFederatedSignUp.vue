<template>
  <v-container>
    <v-btn
      type="submit"
      class="white--text"
      color="indigo"
      rounded
      :width="buttonCols()"
      @click="FacebookFederatedSignUp()"
    >
      {{ SignUpFacebook }}
      <v-icon right>mdi-facebook</v-icon>
    </v-btn>
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
export default class FacebookFederatedSignUp extends Vue {
  user = {
    userEmail: "",
    userPassword: "",
  };

  SignUpFacebook = "Sign up with Facebook";
  errors: string[] = [];
  userEmailRegisteredTrue = "This email is already in use";
  nflMessageError = "Please correct the following error(s):";
  snackbarError = false;

  showErrors(errors: any) {
    this.errors = errors;
    this.snackbarError = true;
  }

  buttonCols() {
    const { xs, sm } = this.$vuetify.breakpoint;
    return xs ? 280 : sm ? 280 : 350;
  }

  FacebookFederatedSignUp() {
    this.errors.splice(0);

    if (this.errors.length == 0) {
      this.$store
        .dispatch("signUp/federatedSignUp", { provider: "facebook" })
        .then(() => {
          if (this.getStatus.registered == false) {
            this.errors.push(this.userEmailRegisteredTrue);
            this.showErrors(this.errors);
          } else {
            this.$store
              .dispatch("internationalization/setUserLanguage")
              .then(() => {
                this.$router.push("/home");
              });
          }
        });
    }
  }

  mounted() {
    this.translate();
  }

  @Watch("translator")
  translate() {
    this.translator.forEach((term: any) => {
      switch (term.termName) {
        case "userEmailRegisteredTrue": {
          this.userEmailRegisteredTrue = term.termTranslation;
          break;
        }
        case "nflMessageError": {
          this.nflMessageError = term.termTranslation;
          break;
        }
        case "SignUpFacebook": {
          this.SignUpFacebook = term.termTranslation;
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

  get getStatus() {
    return this.$store.getters["signUp/getLoginStatus"];
  }
}
</script>
