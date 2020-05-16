<template>
  <v-app :style="setBackground()">
    <MobileSidebar v-bind:open-side-menu="drawer" />
    <Navbar
      v-if="!$route.meta.hideBasicComponents"
      @openSideMenu="openSideMenu"
    />
    <v-content>
      <router-view></router-view>
    </v-content>
    <Footer v-if="!$route.meta.hideBasicComponents" />
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Navbar from "../src/components/Navbar.vue";
import Footer from "../src/components/Footer.vue";
import MobileSidebar from "../src/components/MobileSidebar.vue";

@Component({
  components: {
    Navbar,
    Footer,
    MobileSidebar,
  },
})
export default class App extends Vue {
  draw = false;

  openSideMenu() {
    this.draw = !this.draw;
  }

  get drawer() {
    return this.draw;
  }

  mounted() {
    this.$store.dispatch("internationalization/setUserLanguage");
    this.$store.dispatch("internationalization/getTranslate", {
      lang: this.$store.getters["internationalization/getPreferredLanguage"],
    });
  }

  setBackground() {
    if (this.$route.meta.applyBackground) {
      return {
        backgroundImage: `url("${require("./assets/bglogin.jpg")}")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        height: "100%",
      };
    }
  }
}
</script>
<style lang="scss"></style>
