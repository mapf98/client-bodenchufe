<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on }">
      <v-btn color="indigo" dark v-on="on" :width="buttonCols()">
        <v-icon class="mr-4">mdi-translate</v-icon>
        {{ language || btnLanguage }}
      </v-btn>
    </template>
    <v-list>
      <v-list-item
        v-for="item in items"
        :key="item.value"
        @click="selectLanguage(item.value)"
      >
        <v-list-item-title>{{ item.text }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";

@Component({})
export default class SignUpLanguage extends Vue {
  items = [
    { text: "English US", value: "en-us" },
    { text: "Spanish VE", value: "es-ve" },
  ];
  language = "";

  btnLanguage = "Select your preferred language";

  //envia en lenguaje seleccionado al componente padre
  selectLanguage(language: string) {
    this.language = language;
    this.$emit("languageName", this.language);
  }

  mounted() {
    this.translate();
  }

  buttonCols() {
    const { xs, sm } = this.$vuetify.breakpoint;
    return xs ? 280 : sm ? 320 : 350;
  }

  //Match para incluir los terminos de poeditor en el modulo
  //En base al lenguaje de preferencia del usuario o el que seleccione en la aplicacion
  @Watch("translator")
  translate() {
    this.translator.forEach((term: any) => {
      switch (term.termName) {
        case "btnLanguage": {
          this.btnLanguage = term.termTranslation;
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
}
</script>
<style lang="scss"></style>
