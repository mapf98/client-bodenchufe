<template>
  <v-container>
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn color="indigo" dark v-on="on">
          <v-icon class="mr-4">mdi-translate</v-icon>
          {{ language || "Select your preferred language" }}
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
  </v-container>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class SignUpLanguage extends Vue {
  items = [
    { text: "English US", value: "en-us" },
    { text: "Spanish VE", value: "es-ve" },
  ];
  language = "";
  selectLanguage(language: string) {
    this.language = language;
    this.$emit("languageName", this.language);
  }
}
</script>
<style lang="scss"></style>
