<template>
  <v-container fluid>
    <v-row>
      <v-col>

      </v-col>
    </v-row>
    <v-row>
      <v-col>

      </v-col>
    </v-row>
    <v-row>
      <v-col>

      </v-col>
    </v-row>
    <v-row>
      <v-col>
        
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";

@Component({
  components: {},
})
export default class DashboardHomeProviders extends Vue {
  mounted() {
    this.translate();
  }

  @Watch("translator")
  translate() {
    this.translator.forEach((term: any) => {
      switch (term.termName) {
        // case "navbarCategories": {
        //   this.navbarCategories = term.termTranslation;
        //   break;
        // }
        // case "navbarLogin": {
        //   this.navbarLogin = term.termTranslation;
        //   break;
        // }
        // case "navbarSingUp": {
        //   this.navbarSingUp = term.termTranslation;
        //   break;
        // }
        default: {
          break;
        }
      }
    });
  }

  get translator() {
    return this.$store.getters["internationalization/getLanguageTexts"];
  }
}
</script>

<style lang="scss"></style>
