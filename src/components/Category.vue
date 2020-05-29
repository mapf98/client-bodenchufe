<template>
  <div class="ml-3 my-1">
    <p
      class="mb-0 title selectedCategory indigo--text"
      v-if="categoryData.fk_category_id == null"
      @click="
        getProductsByCategory(
          categoryData.category_id,
          categoryData.category_name
        )
      "
    >
      {{ categoryData.category_name }}
    </p>
    <p
      class="mb-0 selectedCategory"
      v-if="
        categoryData.fk_category_id !== null &&
        categoryData.category_child.length > 0
      "
      @click="
        getProductsByCategory(
          categoryData.category_id,
          categoryData.category_name
        )
      "
    >
      -{{ categoryData.category_name }}
    </p>
    <p
      class="mb-0 selectedCategory"
      v-if="
        categoryData.fk_category_id !== null &&
        categoryData.category_child.length == 0
      "
      @click="
        getProductsByCategory(
          categoryData.category_id,
          categoryData.category_name
        )
      "
    >
      -{{ categoryData.category_name }}
    </p>
    <div>
      <div v-if="categoryData.category_child.length > 0">
        <CategoryChild
          v-for="category in categoryData.category_child"
          :key="category.category_id"
          v-bind:category-data="category"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import CategoryChild from "./Category.vue";

@Component({
  name: "CategoryChild",
  components: {
    CategoryChild,
  },
})
export default class Category extends Vue {
  @Prop() categoryData!: any;

  getProductsByCategory(categoryId: number, categoryName: string) {
    const categories = this.$store.getters["category/getCategories"];
    this.$store
      .dispatch("category/setActualPath", {
        categoryId: categoryId,
        categories: categories,
      })
      .then(() => {
        this.$store
          .dispatch("category/getChildCategories", {
            categoryId: categoryId,
            categories: categories,
          })
          .then(() => {
            this.$store
              .dispatch("product/getProductByCategory", {
                categoryId: categoryId,
                name: categoryName,
                childCategories: this.$store.getters[
                  "category/getChildCategories"
                ],
              })
              .then(() => {
                this.$router.push("/products");
              });
          });
      });
  }
}
</script>

<style lang="scss">
.categoryBox {
  border: 1px solid black;
}

.selectedCategory {
  cursor: pointer;
}

.selectedCategory:hover {
  text-decoration: underline;
}
</style>
