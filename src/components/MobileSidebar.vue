<template>
  <v-navigation-drawer v-model="readyOpen" fixed temporary>
    <v-row>
      <v-col class="d-flex justify-center mt-2 align-center">
        <p class="mb-0 mr-3 headline">{{ navbarNavigation }}</p>
        <v-icon color="black">
          mdi-navigation
        </v-icon>
      </v-col>
    </v-row>
    <v-row class="mt-1" v-if="showUser">
      <v-col>
        <NavbarUser />
      </v-col>
    </v-row>
    <v-row>
      <v-col class="d-flex justify-center">
        <v-btn large color="amber darken-4" outlined min-width="200" @click="goToCategories()">{{
          navbarCategories
        }}</v-btn>
      </v-col>
    </v-row>
    <v-row class="mt-1" v-if="!showUser">
      <v-col class="d-flex justify-center">
        <v-btn
          large
          color="indigo"
          outlined
          @click="goToLogin"
          min-width="200"
          >{{ navbarLogin }}</v-btn
        >
      </v-col>
    </v-row>
    <v-row class="mt-1" v-if="!showUser">
      <v-col class="d-flex justify-center">
        <v-btn
          large
          color="indigo"
          outlined
          min-width="200"
          @click="goToSignUp"
          >{{ navbarSingUp }}</v-btn
        >
      </v-col>
    </v-row>
    <v-row>
      <v-col class="d-flex justify-center">
        <Internationalization />
      </v-col>
    </v-row>
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Watch, Prop } from "vue-property-decorator";
import Internationalization from "../components/Internationalization.vue";
import NavbarUser from "../components/NavbarUser.vue";

@Component({
  components: {
    Internationalization,
    NavbarUser,
  },
})
export default class MobileSidebar extends Vue {
  @Prop() openSideMenu!: boolean;
  readyOpen = false;
  navbarCategories = "Categories";
  navbarLogin = "Log In";
  navbarSingUp = "Sing Up";
  navbarNavigation = "Navigation";
  showUser = false;

  @Watch("openSideMenu")
  drawer() {
    this.readyOpen = !this.readyOpen;
  }

  goToLogin() {
    this.$router.push("/Login");
  }

  goToCart() {
    this.$router.push("/shoppingCart");
  }

  goToSignUp() {
    this.$router.push("/user/signUp");
  }

  goToCategories(){
    this.$router.push("/categories");
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
        case "navbarNavigation": {
          this.navbarNavigation = term.termTranslation;
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  @Watch("userData")
  userLogIn() {
    this.showUser = localStorage.getItem("userData") == null ? false : true;
  }

  get userData() {
    return this.$store.getters["logIn/getLoginUserData"];
  }

  get translator() {
    return this.$store.getters["internationalization/getLanguageTexts"];
  }
}
</script>

<style lang="scss"></style>
