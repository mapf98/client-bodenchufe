<template>
  <v-menu offset-y open-on-hover>
    <template v-slot:activator="{ on }">
      <v-btn
        color="indigo"
        dark
        v-on="on"
        class="d-flex justify-center alig-center"
      >
        <v-icon class="mr-4">mdi-translate</v-icon>
        {{ language }}
        <v-progress-circular
          v-if="loading"
          :size="20"
          class="ml-1"
          width="3"
          color="white"
          indeterminate
        ></v-progress-circular>
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
  loading = false;

  selectLanguage(language: string) {
    this.language = language;
    this.getTranslate();
  }

  getTranslate() {
    this.loading = true;
    this.$store
      .dispatch("internationalization/getTranslate", {
        lang: this.language,
      })
      .then(() => {
        this.loading = false;
      });
  }

  mounted() {
    this.loading = true;
    this.language = this.$store.getters["internationalization/getPreferredLanguage"];
    this.$store.dispatch("internationalization/getTranslate", {
      lang: this.$store.getters["internationalization/getPreferredLanguage"],
    }).then(()=>{
      this.loading = false;
    });
  }

  @Watch("preferredLanguage")
  translate() {
    this.language = this.preferredLanguage;
  }

  get preferredLanguage() {
    return this.$store.getters["internationalization/getPreferredLanguage"];
  }
}
</script>

<style lang="scss"></style>
