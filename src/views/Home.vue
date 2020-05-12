<template>
  <v-container fluid class="black white--text" >
    <v-row>
      <v-col class="d-flex justify-center white--text">
        <v-select
          dark
          color="white"
          :items="items"
          v-model="language"
          :loading="loading"
          @click="getAllUsers"
        >
          GET Users
        </v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="d-flex flex-wrap justify-center">
        <v-card
          v-for="user in users"
          :key="user.user_id"
          color="#385F73"
          dark
          min-width="500"
          class="ma-5"
          transition="slide-y-transition"
        >
          <v-card-title class="headline text-center">{{
            user.user_email
          }}</v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class Home extends Vue {
  loading = false;

  getAllUsers() {
    this.loading = true;
    this.$store.dispatch("users/getAllUsers").then(() => {
      this.loading = false;
    });
  }

  get users() {
    return this.$store.state.users.users;
  }
}
</script>

<style lang="scss"></style>
