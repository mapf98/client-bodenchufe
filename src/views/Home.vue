<template>
  <v-container fluid>
    <v-row>
      <v-col class="d-flex justify-center">
        <v-select
          :items="items"
          v-model="language"
          :loading="loading"
          label="Idioma"
        ></v-select>
      </v-col>
      <v-col class="d-flex justify-center">
        <p>{{ welcome }}</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";

@Component({})
export default class Home extends Vue {
  welcome = "";
  loading = false;
  items = ["en-us", "es-ve"];
  language = "en-us";

  @Watch("language")
  selectLanguage() {
    this.getTranslate();
  }

  created() {
    this.getTranslate();
  }

  translate() {
    const translate = this.$store.state.translate.languagesTexts;
    translate.forEach((term: any) => {
      if (term.termName == "welcome") {
        this.welcome = term.termTranslation;
      }
    });
  }

  getTranslate() {
    this.loading = true;
    this.$store
      .dispatch("translate/getTranslate", { lang: this.language })
      .then(() => {
        this.translate();
        this.loading = false;
      });
  }
}
</script>

<style lang="scss"></style>
