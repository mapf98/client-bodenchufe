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
  status = {
    validated: false,
    blocked: false,
    registered: false,
  };

  notFederatedLogIn(e: Event) {
    e.preventDefault();
    this.errors.splice(0);

    if (!this.user.userEmail) {
      this.errors.push("Email required");
    }

    if (!this.user.userPassword) {
      this.errors.push("Password required");
    }

    if (this.errors.length == 0) {
      this.$store
        .dispatch("logIn/notFederatedLogIn", { user: this.user })
        .then((res: any) => {
          this.status = this.getStatus;
          if (
            this.status.validated == false &&
            this.status.blocked == false &&
            this.status.registered == true
          ) {
            this.errors.push("Mail or Account incorrect");
          }
          if (
            this.status.validated == false &&
            this.status.blocked == true &&
            this.status.registered == true
          ) {
            this.errors.push("User blocked");
          }
          if (
            this.status.validated == false &&
            this.status.blocked == false &&
            this.status.registered == false
          ) {
            this.errors.push("Mail not registered");
          }
        });
    }
  }

  get getStatus() {
    return this.$store.state.logIn.status;
  }
}
</script>
