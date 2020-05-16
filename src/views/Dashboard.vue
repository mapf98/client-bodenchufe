<template>
  <v-container fluid>
    <v-row>
      <router-view></router-view>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class Dashboard extends Vue {}
</script>

<style lang="scss"></style>
