<template>
  <v-form @submit="notFederatedLogIn">
    <v-container>
      <v-row>
        <v-card-text v-if="errors.length">
          <b>{{ nflMessageError }}</b>
          <ul>
            <li v-for="error in errors" :key="error.id">{{ error }}</li>
          </ul>
        </v-card-text>
      </v-row>
      <v-row>
        <v-text-field
          v-model="user.userEmail"
          label="Email"
          required
        ></v-text-field>
      </v-row>
      <v-row>
        <v-text-field
          v-model="user.userPassword"
          label="Password"
          required
          type="password"
        ></v-text-field>
      </v-row>

      <v-row justify="center">
        <v-btn type="submit">LogIn</v-btn>
      </v-row>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";

@Component({})
export default class NotFederatedLogin extends Vue {
  user = {
    userEmail: "",
    userPassword: "",
  };

  errors: string[] = [];
  nflEmailRequired = "Email required";
  nflPasswordRequired = "Password required";
  nflInvalidMailOrAccount = "Mail or Account incorrect";
  nflUserBlocked = "User blocked";
  nflMailNotRegistered = "Mail not registered";
  nflMessageError = "Please correct the following error(s):";

  notFederatedLogIn(e: Event) {
    e.preventDefault();
    this.errors.splice(0);

    if (!this.user.userEmail) {
      this.errors.push(this.nflEmailRequired);
    }

    if (!this.user.userPassword) {
      this.errors.push(this.nflPasswordRequired);
    }

    if (this.errors.length == 0) {
      this.$store
        .dispatch("logIn/notFederatedLogIn", { user: this.user })
        .then((res: any) => {
          if (
            this.getStatus.validated == false &&
            this.getStatus.blocked == false &&
            this.getStatus.registered == true
          ) {
            this.errors.push(this.nflInvalidMailOrAccount);
          }
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
        });
    }
  }

  @Watch("translator")
  translate() {
    console.log("test", this.translator);
    this.translator.forEach((term: any) => {
      switch (term.termName) {
        case "nflEmailRequired": {
          this.nflEmailRequired = term.termTranslation;
          break;
        }
        case "nflPasswordRequired": {
          this.nflPasswordRequired = term.termTranslation;
          break;
        }
        case "nflInvalidMailOrAccount": {
          this.nflInvalidMailOrAccount = term.termTranslation;
          break;
        }
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
    return this.$store.state.internationalization.languagesTexts;
  }

  get getStatus() {
    return this.$store.getters["logIn/getLoginStatus"];
  }
}
</script>
