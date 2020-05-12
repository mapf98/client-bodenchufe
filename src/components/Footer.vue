<template>
  <v-footer app class="amber accent-4">
    <v-row class="d-flex align-center">
      <v-col>
        <v-icon class="mr-8 pointer" color="black" @click="openInstagram"> 
          mdi-instagram
        </v-icon> 
        <v-icon class="mr-8 pointer" color="black" @click="openTwitter">
          mdi-twitter
        </v-icon>
        <v-icon class="mr-8 pointer" color="black" @click="openBTC">
          mdi-bitcoin
        </v-icon>
        <v-icon class="pointer" color="black" @click="openETH">
          mdi-ethereum
        </v-icon>
      </v-col>
      <v-col class="d-flex justify-end">
        <v-btn
          :loading="loading3"
          color="blue-grey"
          class="ma-2 white--text"
          @click="openGitHub"
        >
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
  openGitHub(){
    window.open("https://github.com/mapf98/client-bodenchufe");
  }

  openInstagram(){
    window.open("https://www.instagram.com/?hl=es-la");
  }

  openTwitter(){
    window.open("https://twitter.com/explore");
  }

  openBTC(){
    window.open("https://bitcoin.org/es/");
  }

  openETH(){
    window.open("https://ethereum.org/");
  }
}
</script>

<style lang="scss">

.pointer{
  cursor: pointer;
}

</style>
