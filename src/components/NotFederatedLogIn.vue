<template>
  <v-form @submit="notFederatedLogIn">
    <v-container>
      <v-row>
        <v-card-text v-if="errors.length">
          <b>Please correct the following error(s):</b>
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

@Component({})
export default class NotFederatedLogin extends Vue {
  user = {
    userEmail: "",
    userPassword: "",
  };
  errors: string[] = [];
  nflEmailRequired = "Email required";

  notFederatedLogIn(e: Event) {
    e.preventDefault();
    this.errors.splice(0);

    if (!this.user.userEmail) {
      this.errors.push(this.nflEmailRequired);
    }

    if (!this.user.userPassword) {
      this.errors.push("Password required");
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
            this.errors.push("Mail or Account incorrect");
          }
          if (
            this.getStatus.validated == false &&
            this.getStatus.blocked == true &&
            this.getStatus.registered == true
          ) {
            this.errors.push("User blocked");
          }
          if (
            this.getStatus.validated == false &&
            this.getStatus.blocked == false &&
            this.getStatus.registered == false
          ) {
            this.errors.push("Mail not registered");
          }
        });
    }
  }

  get getStatus() {
    return this.$store.getters["logIn/getLoginStatus"];
  }
}
</script>
