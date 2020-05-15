<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on }">
      <v-btn color="indigo" dark v-on="on">
        <v-icon class="mr-4">mdi-translate</v-icon>
        {{ language }}
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
export default class Internationalization extends Vue {
  items = [
    { text: "English US", value: "en-us" },
    { text: "Spanish VE", value: "es-ve" },
  ];
  language = "";

  selectLanguage(language: string) {
    this.language = language;
    this.getTranslate();
  }

  getTranslate() {
    this.$store.dispatch("internationalization/getTranslate", {
      lang: this.language,
    });
  }

  mounted() {
    this.language = this.$store.getters[
      "internationalization/getPreferredLanguage"
    ];
  }

  @Watch("preferredLanguage")
  translate() {
    this.language = this.preferredLanguage;
  }

  get preferredLanguage() {
    const userData = localStorage.getItem("userData");
    let userLanguage: string;
    let user: any;
    if (userData !== null) {
      user = JSON.parse(userData);
      userLanguage = user.userLanguage;
      console.log(userLanguage);
      //localstorage user language
      return "";
    } else {
      return this.$store.getters["internationalization/getPreferredLanguage"];
    }
  }
}
</script>

<style lang="scss"></style>
