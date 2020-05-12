<template>
  <v-app-bar app>
    <v-row class="d-flex align-center">
      <v-col >
        <v-img src="../assets/logoBodenchufe.png" max-width="200"></v-img>
      </v-col>
      <v-col cols="4">
        <SearchBox />
      </v-col>
      <v-col class="d-flex justify-start">
        <v-btn small color="amber darken-4" outlined>{{navbarCategories}}</v-btn>
      </v-col>
      <v-col class="d-flex justify-end">
        <v-btn text small color="indigo" @click="goToLogin">{{navbarLogin}}</v-btn>
      </v-col>
      <v-col class="d-flex justify-end">
        <v-btn text small color="indigo">{{navbarSingUp}}</v-btn>
      </v-col>
      <v-col class="d-flex justify-end">
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
    Internationalization
  }
})
export default class Navbar extends Vue {
  navbarCategories = "Categories";
  navbarLogin = "Log In";
  navbarSingUp = "Sing Up";

  goToLogin(){
    this.$router.push("/Login");
  }

  @Watch("translator")
  translate() {
    this.translator.forEach((term: any) => {
      switch(term.termName) { 
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

  get translator(){
    return this.$store.state.internationalization.languagesTexts;
  };

}
</script>

<style lang="scss"></style>
