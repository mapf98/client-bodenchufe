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
          v-model="user.user_email"
          label="Email"
          required
        ></v-text-field>
      </v-row>
      <v-row>
        <v-text-field
          v-model="user.user_password"
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
    // eslint-disable-next-line @typescript-eslint/camelcase
    user_email: "",
    // eslint-disable-next-line @typescript-eslint/camelcase
    user_password: "",
  };
  errors: string[] = [];
  status = "";

  notFederatedLogIn(e: Event) {
    e.preventDefault();
    this.errors.splice(0);

    if (!this.user.user_email) {
      this.errors.push("Email required");
    }

    if (!this.user.user_password) {
      this.errors.push("Password required");
    }

    if (this.errors.length == 0) {
      this.$store
        .dispatch("logIn/notFederatedLogIn", { user: this.user })
        .then((res: any) => {
          console.log(this.$store.state.logIn.user);
          console.log(this.$store.state.logIn.status);
        });
    }
  }

  get getStatus() {
    return this.$store.state.logIn.status;
  }
}
</script>
