<template>
  <v-app-bar app>
    <v-row class="hidden-md-and-up">
      <v-col class="d-flex justify-start">
        <v-img
          src="../assets/logoBodenchufe.png"
          max-width="170"
          class="imgPointer"
          @click="goToHome"
        ></v-img>
      </v-col>
    </v-row>
    <v-app-bar-nav-icon
      class="hidden-md-and-up"
      @click="openSideMenu"
    ></v-app-bar-nav-icon>

    <v-row class="d-md-flex align-center hidden-sm-and-down">
      <v-col class="mr-8">
        <v-img
          src="../assets/logoBodenchufe.png"
          max-width="200"
          class="imgPointer"
          @click="goToHome"
        ></v-img>
      </v-col>
      <v-col cols="3">
        <SearchBox v-bind:clear="clearBox" />
      </v-col>
      <v-col class="d-flex justify-start">
        <v-btn small color="amber darken-4" outlined @click="goToCategories">{{
          navbarCategories
        }}</v-btn>
      </v-col>
      <v-col class="d-flex justify-end" v-if="!showUser">
        <v-btn text small color="indigo" @click="goToLogin">{{
          navbarLogin
        }}</v-btn>
      </v-col>
      <v-col class="d-flex justify-center" v-if="!showUser">
        <v-btn text small color="indigo" @click="goToSignUp">{{
          navbarSingUp
        }}</v-btn>
      </v-col>
      <v-col class="d-flex justify-center" v-if="showUser">
        <NavbarUser />
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
import NavbarUser from "../components/NavbarUser.vue";

@Component({
  components: {
    SearchBox,
    Internationalization,
    NavbarUser,
  },
})
export default class Navbar extends Vue {
  navbarCategories = "Categories";
  navbarLogin = "Log In";
  navbarSingUp = "Sing Up";
  showUser = false;
  clearBox = false;

  changeBox() {
    this.clearBox = !this.clearBox;
  }

  goToHome() {
    this.changeBox();
    this.$router.currentRoute.path != "/home"
      ? this.$router.push("/home")
      : false;
  }

  goToLogin() {
    this.changeBox();
    this.$router.push("/Login");
  }

  goToSignUp() {
    this.changeBox();
    this.$router.push("/user/signUp");
  }

  goToCategories() {
    this.changeBox();
    this.$router.currentRoute.path != "/categories"
      ? this.$router.push("/categories")
      : false;
  }

  mounted() {
    this.showUser = localStorage.getItem("userData") == null ? false : true;
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

<style lang="scss">
.imgPointer {
  cursor: pointer;
}
</style>
