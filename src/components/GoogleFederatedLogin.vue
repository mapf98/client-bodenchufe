<template>
  <v-container>
    <v-row>
      <v-col>
        <v-btn
          type="submit"
          class="white--text"
          color="indigo"
          @click="GoogleFederatedLogIn()"
          >Google</v-btn
        >
      </v-col>
    </v-row>
    <v-row>
      <v-card-text v-if="errors.length">
        <b>{{ nflMessageError }}</b>
        <ul>
          <li v-for="error in errors" :key="error.id">{{ error }}</li>
        </ul>
      </v-card-text>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";

@Component({})
export default class GoogleFederatedLogin extends Vue {
  user = {
    userEmail: "",
    userPassword: "",
  };

  errors: string[] = [];
  nflUserBlocked = "User blocked";
  nflMailNotRegistered = "Mail not registered";
  nflMessageError = "Please correct the following error(s):";

  GoogleFederatedLogIn() {
    this.errors.splice(0);

    if (this.errors.length == 0) {
      this.$store
        .dispatch("logIn/federatedLogIn", { provider: "google" })
        .then(() => {
          if (
            this.getStatus.validated == false &&
            this.getStatus.blocked == true &&
            this.getStatus.registered == true
          ) {
            this.errors.push(this.nflUserBlocked);
          }
          if (
            this.getStatus.validated == false &&
            this.getStatus.blocked == false &&
            this.getStatus.registered == false
          ) {
            this.errors.push(this.nflMailNotRegistered);
          }
          if (this.errors.length == 0) {
            this.$router.push("/");
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
        case "nflUserBlocked": {
          this.nflUserBlocked = term.termTranslation;
          break;
        }
        case "nflMailNotRegistered": {
          this.nflMailNotRegistered = term.termTranslation;
          break;
        }
        case "nflMessageError": {
          this.nflMessageError = term.termTranslation;
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
    return this.$store.getters["logIn/getLoginStatus"];
  }
}
</script>
