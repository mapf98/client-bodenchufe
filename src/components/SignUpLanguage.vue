<template>
  <v-container>
    <v-row>
      <v-col class="text-center">
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn color="indigo" dark v-on="on">
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
      </v-col>
    </v-row>
  </v-container>
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

  selectLanguage(language: string) {
    this.language = language;
    this.$emit("languageName", this.language);
  }

  mounted() {
    this.translate();
  }

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

  get translator() {
    return this.$store.getters["internationalization/getLanguageTexts"];
  }
}
</script>
<style lang="scss"></style>
