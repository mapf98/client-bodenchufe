<template>
  <v-container fluid>
    <v-row>
      <v-col class="d-flex justify-center">
        <router-link to="/home">
          <v-img src="../assets/logoBodenchufe.png" max-width="300"></v-img
        ></router-link>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="d-flex justify-center text-center">
        <v-btn
          text
          color="indigo"
          class="white--text text-center"
          @click="goToProfile()"
          ><v-icon class="mr-2">mdi-backspace-outline</v-icon
          >{{ profileText }}</v-btn
        >
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <DeliveryBar />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <router-view></router-view>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import DeliveryBar from "../components/DeliveryBar.vue";
import { Watch } from "vue-property-decorator";

@Component({
  components: {
    DeliveryBar,
  },
})
export default class DeliveryAddress extends Vue {
  profileText = "Back to profile";

  goToProfile() {
    this.$router.push("/profile");
  }

  //Match para incluir los terminos de poeditor en el modulo
  //En base al lenguaje de preferencia del usuario o el que seleccione en la aplicacion
  @Watch("translator")
  translate() {
    this.translator.forEach((term: any) => {
      switch (term.termName) {
        case "profileText": {
          this.profileText = term.termTranslation;
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  //Getter de todos los terminos almacenados en PoEditor
  get translator() {
    return this.$store.getters["internationalization/getLanguageTexts"];
  }

  mounted() {
    this.translate();
  }
}
</script>

<style lang="scss"></style>
