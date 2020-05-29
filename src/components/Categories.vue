<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <p class="mb-0 text-center title indigo--text">{{ categoriesTitle }}</p>
        <v-divider class="amber mt-2"></v-divider>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="d-flex justify-center flex-wrap">
        <v-card
          v-for="category in categories"
          :key="category.category_id"
          elevation="5"
          width="200"
          class="ma-5 pa-5"
        >
          <Category v-bind:category-data="category" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";
import Category from "./Category.vue";

@Component({
  components: {
    Category,
  },
})
export default class Categories extends Vue {
  categoriesTitle = "Categories";

  mounted() {
    this.translate();
    this.$store.dispatch("category/getCategories");
  }

  @Watch("translator")
  translate() {
    this.translator.forEach((term: any) => {
      switch (term.termName) {
        case "categoriesTitle": {
          this.categoriesTitle = term.termTranslation;
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  get categories() {
    return this.$store.getters["category/getCategories"];
  }

  get translator() {
    return this.$store.getters["internationalization/getLanguageTexts"];
  }
}
</script>

<style lang="scss"></style>
