<template>
  <v-container>
    <v-row>
      <v-col class="d-flex justify-center">
        <router-link to="/">
          <v-img src="../assets/logoBodenchufe.png" max-width="300"></v-img
        ></router-link>
      </v-col>
    </v-row>

    <v-card outlined elevation="6" class="mt-12 px-12">
      <v-card-title>
        <p class="title mb-0">{{ loginIntro }}</p>
      </v-card-title>
      <v-row class="d-flex align-center mb-6">
        <v-col>
          <NotFederatedLogIn @showErrors="showErrors" />
        </v-col>
        <v-col class="d-flex justify-center" :cols="separatorCols()">
          <v-icon x-large color="indigo" class="my-5">
            mdi-clipboard-account-outline
          </v-icon>
        </v-col>
        <v-col>
          <v-row class="mb-5">
            <v-col class="d-flex justify-center">
              <GoogleFederatedLogIn @showErrors="showErrors" />
            </v-col>
          </v-row>
          <v-row>
            <v-col class="d-flex justify-center">
              <FacebookFederatedLogIn @showErrors="showErrors" />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>

    <v-row class="d-flex align-end mt-12">
      <v-col class="d-flex justify-center mt-10">
        <v-btn color="amber" class="white--text" x-large
          >{{ loginSignUp }} <v-icon class="ml-5">mdi-location-enter</v-icon>
        </v-btn>
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
import NotFederatedLogIn from "../components/NotFederatedLogIn.vue";
import GoogleFederatedLogIn from "../components/GoogleFederatedLogin.vue";
import FacebookFederatedLogIn from "../components/FacebookFederatedLogin.vue";

@Component({
  components: {
    NotFederatedLogIn,
    GoogleFederatedLogIn,
    FacebookFederatedLogIn,
  },
})
export default class Login extends Vue {
  loginIntro = "Login with:";
  loginSignUp = "Sign Up";
  snackbarError = false;
  errors = [];

  mounted() {
    this.translate();
  }

  separatorCols() {
    const { xs, sm } = this.$vuetify.breakpoint;
    return xs || sm ? 12 : 2;
  }

  @Watch("translator")
  translate() {
    this.translator.forEach((term: any) => {
      switch (term.termName) {
        case "loginIntro": {
          this.loginIntro = term.termTranslation;
          break;
        }
        case "loginSignUp": {
          this.loginSignUp = term.termTranslation;
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

  showErrors(errors: any) {
    this.errors = errors;
    this.snackbarError = true;
  }
}
</script>

<style lang="scss"></style>
