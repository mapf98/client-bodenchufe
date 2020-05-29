<template>
  <v-autocomplete
    :items="productsByKeyword"
    :label="searchBoxLabel"
    v-model="keyword"
    :search-input.sync="keywordSearch"
    flat
    dense
    :loading="loading"
    color="blue-grey lighten-2"
    item-text="text"
    item-value="value"
    hide-no-data
    return-object
    hide-details
    solo-inverted
    clearable
  >
    <template v-slot:item="data">
      <template>
        <div class="d-flex justify-center align-center">
          <v-chip
            class="mr-3"
            small
            label
            color="indigo"
            dark
            v-if="data.item.type == `product`"
          >
            {{ productChip }}
          </v-chip>
          <v-chip
            class="mr-3"
            small
            label
            color="amber darken-2"
            dark
            v-if="data.item.type == `category`"
          >
            {{ categoryChip }}
          </v-chip>
          <v-list-item-content>
            <v-list-item-title v-html="data.item.text"></v-list-item-title>
            <v-list-item-subtitle
              v-html="data.item.price"
              v-if="data.item.type == `product`"
            ></v-list-item-subtitle>
          </v-list-item-content>
        </div>
      </template>
    </template>
  </v-autocomplete>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Watch, Prop } from "vue-property-decorator";

@Component({})
export default class SearchBox extends Vue {
  @Prop() clear!: boolean;
  searchBoxLabel = "Find the product you want";
  keyword: any = {};
  categoryChip = "Category";
  productChip = "Product";
  keywordSearch = "";
  loading = false;

  @Watch("clear")
  clearBoxNavbar() {
    this.keyword = {};
    this.keywordSearch = "";
  }

  @Watch("keywordSearch")
  findProductsByKeyword(val: any) {
    this.loading = true;
    if (val !== undefined && val !== null) {
      this.$store
        .dispatch("product/getProductByKeyword", { keyword: val })
        .then(() => {
          this.loading = false;
        });
    } else {
      this.loading = false;
    }
  }

  @Watch("keyword")
  goToSearch(val: any) {
    if (val !== undefined) {
      if (val.type == "product" && this.$route.params.productId != val.value) {
        this.$store
          .dispatch("product/getProductDetail", { postId: val.value })
          .then(() => {
            this.$router.push({
              name: "detail",
              params: { productId: val.value.toString() },
            });
          });
      }

      if (val.type == "category") {
        this.goToCategory(val.value, val.text);
      }
    }
  }

  goToCategory(categoryId: number, categoryName: string) {
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
                name: categoryName.split(" ")[0],
                childCategories: this.$store.getters[
                  "category/getChildCategories"
                ],
              })
              .then(() => {
                this.$router.currentRoute.path != "/products"
                  ? this.$router.push("/products")
                  : false;
              });
          });
      });
  }

  mounted() {
    this.translate();
  }

  @Watch("translator")
  translate() {
    const translate = this.$store.state.internationalization.languagesTexts;
    translate.forEach((term: any) => {
      switch (term.termName) {
        case "searchBoxLabel": {
          this.searchBoxLabel = term.termTranslation;
          break;
        }
        case "categoryChip": {
          this.categoryChip = term.termTranslation;
          break;
        }
        case "productChip": {
          this.productChip = term.termTranslation;
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  get productsByKeyword() {
    const products = this.$store.getters["product/getProductByKeyword"]
      .products;
    const categories = this.$store.getters["product/getProductByKeyword"]
      .categories;
    let autocompleteProducts: any = [];

    if (products !== undefined) {
      products.forEach((product: any) => {
        autocompleteProducts.push({
          text: product.product_name,
          price: product.product_provider_price + " " + "$",
          value: product.product_provider_id,
          type: "product",
        });
      });
    }

    if (categories !== undefined) {
      categories.forEach((category: any) => {
        autocompleteProducts.push({
          text: category.category_name,
          price: 0,
          value: category.category_id,
          type: "category",
        });
      });
    }

    return autocompleteProducts;
  }

  get translator() {
    return this.$store.getters["internationalization/getLanguageTexts"];
  }
}
</script>

<style lang="scss"></style>
