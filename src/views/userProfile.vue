<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <Profile />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Profile from "../components/Profile.vue";

@Component({
  components: {
    Profile,
  },
})
export default class UserProfile extends Vue {}
</script>

<style lang="scss"></style>
