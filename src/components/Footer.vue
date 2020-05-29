<template>
  <v-footer app class="indigo" absolute>
    <v-row class="d-flex align-center">
      <v-col class="d-flex justify-center">
        <v-icon class="mr-8 pointer" color="white" @click="openInstagram">
          mdi-instagram
        </v-icon>
        <v-icon class="mr-8 pointer" color="white" @click="openTwitter">
          mdi-twitter
        </v-icon>
        <v-icon class="mr-8 pointer" color="white" @click="openBTC">
          mdi-bitcoin
        </v-icon>
        <v-icon class="pointer" color="white" @click="openETH">
          mdi-ethereum
        </v-icon>
      </v-col>
      <v-col class="d-flex justify-center">
        <v-btn color="blue-grey" class="ma-2 white--text" @click="openGitHub">
          client-bodenchufe
          <v-icon right>mdi-github</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class Footer extends Vue {
  openGitHub() {
    window.open("https://github.com/mapf98/client-bodenchufe");
  }

  openInstagram() {
    window.open("https://www.instagram.com/?hl=es-la");
  }

  openTwitter() {
    window.open("https://twitter.com/explore");
  }

  openBTC() {
    window.open("https://bitcoin.org/es/");
  }

  openETH() {
    window.open("https://ethereum.org/");
  }
}
</script>

<style lang="scss">
.pointer {
  cursor: pointer;
}
</style>
