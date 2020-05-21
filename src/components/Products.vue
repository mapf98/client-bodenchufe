<template>
  <v-container fluid>
    <v-row>
      <v-col cols="3" v-if="categoryPaths.length !== 0">
        <SidebarProduct />
      </v-col>
      <v-col>
        <Product
          v-for="product in products"
          :key="product.post_id"
          v-bind:product="product"
        />
        <div v-if="products.length == 0 ? true : false" class="mt-12">
          <p class="mb-0 mt-12 indigo--text display-1 text-center">
            {{ noResults }}
          </p>
          <v-icon
            class="d-flex justify-center mt-6 mb-12"
            color="indigo"
            x-large
          >
            mdi-magnify-remove-outline
          </v-icon>
          <div
            class="d-flex justify-center mt-6"
            v-if="categoryPaths.length == 0"
          >
            <v-btn color="amber" @click="goToCategories()">
              {{ toCategories }}
            </v-btn>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";
import SidebarProduct from "../components/SidebarProduct.vue";
import Product from "../components/Product.vue";

@Component({
  components: {
    SidebarProduct,
    Product,
  },
})
export default class Products extends Vue {
  noResults = "Sorry, there are no results for this search";
  toCategories = "Back to categories";

  mounted() {
    this.translate();
  }

  @Watch("translator")
  translate() {
    this.translator.forEach((term: any) => {
      switch (term.termName) {
        case "noResults": {
          this.noResults = term.termTranslation;
          break;
        }
        case "toCategories": {
          this.toCategories = term.termTranslation;
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  get products() {
    return this.$store.getters["product/getProducts"];
  }

  goToCategories() {
    this.$router.push("/categories");
  }

  get translator() {
    return this.$store.getters["internationalization/getLanguageTexts"];
  }

  get categoryPaths() {
    return this.$store.getters["category/getActualPath"];
  }
}
</script>

<style lang="scss"></style>
