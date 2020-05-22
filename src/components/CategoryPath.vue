<template>
  <div>
    <v-row
      class="d-flex justify-center align-center grey pa-5 white--text"
      v-if="productPath.type == `category`"
    >
      <p
        v-for="category in categoryPaths"
        :key="category.categoryId"
        class="my-1 mx-1 paths"
        @click="goToCategory(category.categoryId, category.categoryName)"
      >
        {{ category.categoryName }}
      </p>
    </v-row>
    <v-row class="d-flex justify-center align-center indigo pa-5 white--text">
      <p class="mb-0">{{ productPath.pathName }}</p>
    </v-row>
    <v-row class="d-flex indigo">
      <v-divider class="amber"></v-divider>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";

@Component({})
export default class CategoryPath extends Vue {
  goToCategory(categoryId: number, categoryName: string) {
    const categories = this.$store.getters["category/getCategories"];
    this.$store
      .dispatch("category/setActualPath", {
        categoryId: categoryId,
        categories: categories,
      }).then(()=>{
        this.$store.dispatch("category/getChildCategories", {
          categoryId: categoryId,
          categories: categories,
        }).then(()=>{
          this.$store
          .dispatch("product/getProductByCategory", {
            categoryId: categoryId,
            name: categoryName.split(" ")[0],
            childCategories: this.$store.getters["category/getChildCategories"],
          });
        });
      });
  }

  get categoryPaths() {
    return this.$store.getters["category/getActualPath"];
  }

  get productPath() {
    return this.$store.getters["product/getProductsPath"];
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
