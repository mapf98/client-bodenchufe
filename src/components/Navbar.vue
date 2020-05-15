<template>
  <v-app-bar app>
    <v-row class="hidden-md-and-up">
      <v-col class="d-flex justify-start">
        <v-img src="../assets/logoBodenchufe.png" max-width="170"></v-img>
      </v-col>
    </v-row>
    <v-app-bar-nav-icon
      class="hidden-md-and-up"
      @click="openSideMenu"
    ></v-app-bar-nav-icon>

    <v-row class="d-md-flex align-center hidden-sm-and-down">
      <v-col class="mr-8">
        <v-img src="../assets/logoBodenchufe.png" max-width="200"></v-img>
      </v-col>
      <v-col cols="3">
        <SearchBox />
      </v-col>
      <v-col class="d-flex justify-start">
        <v-btn small color="amber darken-4" outlined>{{
          navbarCategories
        }}</v-btn>
      </v-col>
      <v-col class="d-flex justify-end">
        <v-btn text small color="indigo" @click="goToLogin">{{
          navbarLogin
        }}</v-btn>
      </v-col>
      <v-col class="d-flex justify-center">
        <v-btn text small color="indigo" @click="goToSignUp">{{ navbarSingUp }}</v-btn>
      </v-col>
      <v-col class="d-flex justify-center">
        <Internationalization />
      </v-col>
    </v-row>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";
import SearchBox from "../components/SearchBox.vue";
import Internationalization from "../components/Internationalization.vue";

@Component({
  components: {
    SearchBox,
    Internationalization,
  },
})
export default class Navbar extends Vue {
  navbarCategories = "Categories";
  navbarLogin = "Log In";
  navbarSingUp = "Sing Up";

  goToLogin() {
    this.$router.push("/Login");
  }

  goToSignUp() {
    this.$router.push("/signUp");
  }

  mounted() {
    this.translate();
  }

  @Watch("translator")
  translate() {
    this.translator.forEach((term: any) => {
      switch (term.termName) {
        case "navbarCategories": {
          this.navbarCategories = term.termTranslation;
          break;
        }
        case "navbarLogin": {
          this.navbarLogin = term.termTranslation;
          break;
        }
        case "navbarSingUp": {
          this.navbarSingUp = term.termTranslation;
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

  openSideMenu() {
    this.$emit("openSideMenu");
  }
}
</script>

<style lang="scss"></style>
