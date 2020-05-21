<template>
  <v-row class="d-flex justify-start indigo pa-5 white--text" v-if="filterCategory.categoryChild.length != 0">
    <div>
      <p class="mb-0 title">{{filterCategories}}</p>
      <p class="mb-0 ml-6 body-2 paths" 
        v-for="cat in filterCategory.categoryChild" 
        :key="cat.category_id"
        @click="goToCategory(cat.category_id, cat.category_name)"
      >
        {{cat.category_name}}
      </p>
      <p v-if="rootCategory" class="mb-0 ml-6 body-2 paths"
        @click="goToCategories"
      >
        {{otherCategories}}
      </p>
    </div>
    <div class="d-flex justify-center" v-if="responsivePanel()">
      <v-btn>Test</v-btn>
    </div>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";

@Component({})
export default class FilterSideProducts extends Vue {
  filterCategories = "Categories";
  rootCategory = false;
  otherCategories = "Other categories";

  responsivePanel() {
    const { xs, sm } = this.$vuetify.breakpoint;
    return xs || sm ? true : false;
  }

  get filterCategory() {
    const paths = this.$store.getters["category/getActualPath"];
    if(paths.length == 1){
      this.rootCategory = true;
    }else{
      this.rootCategory = false;
    }
    return paths[paths.length-1];
  }

  goToCategories() {
    this.$router.push("/categories")
  }

  goToCategory(categoryId: number, categoryName: string) {
    this.$store
      .dispatch("product/getProductByCategory", {
        categoryId: categoryId,
        name: categoryName,
      })
      .then(() => {
        this.$store.dispatch("category/setActualPath", {
          categoryId: categoryId,
          categories: this.$store.getters["category/getCategories"],
        });
      });
  }

   mounted() {
    this.translate();
  }

  @Watch("translator")
  translate() {
    this.translator.forEach((term: any) => {
      switch (term.termName) {
        case "filterCategories": {
          this.filterCategories = term.termTranslation;
          break;
        }
        case "otherCategories": {
          this.otherCategories = term.termTranslation;
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

<style lang="scss">
.paths {
  cursor: pointer;
}

.paths:hover {
  text-decoration: underline;
}
</style>
