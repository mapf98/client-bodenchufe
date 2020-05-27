<template>
  <v-autocomplete
    :items="productsByKeyword"
    :label="searchBoxLabel"
    v-model="keyword"
    :search-input.sync="keywordSearch"
    flat
    dense
    :loading="loading"
    item-text="text"
    item-value="value"
    hide-no-data
    return-object
    hide-details
    solo-inverted
    clearable
    cache-items
  ></v-autocomplete>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";

@Component({})
export default class SearchBox extends Vue {
  searchBoxLabel = "Find the product you want";
  keyword: any = {};
  keywordSearch = "";
  loading = false;

  @Watch("keywordSearch")
  findProductsByKeyword(val: any) {
    this.loading = true;
    if (val !== undefined && val !== null && this.clearKeyword == false) {
      console.log(val);
      this.$store.dispatch("product/setClearKeyword", false);
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
  goToProductDetail(val: any) {
    if (val !== undefined && this.clearKeyword == false) {
      this.$store
        .dispatch("product/getProductDetail", { postId: val.value })
        .then(() => {
          this.$router.push("/detail");
        });
    } else {
      if (this.clearKeyword == false) {
        this.$router.push("/home");
      }
    }
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
        default: {
          break;
        }
      }
    });
  }

  @Watch("clearKeyword")
  clearSearch() {
    if (this.clearKeyword == true) {
      this.keyword = {};
      this.keywordSearch = "";
    }
  }

  get productsByKeyword() {
    const products = this.$store.getters["product/getProductByKeyword"];
    let autocompleteProducts: any = [];

    if (products !== undefined) {
      products.forEach((product: any) => {
        autocompleteProducts.push({
          text:
            product.product_name +
            " (" +
            product.product_provider_price +
            " $)",
          value: product.product_provider_id,
        });
      });
    }

    return autocompleteProducts;
  }

  get clearKeyword() {
    return this.$store.getters["product/getClearKeyword"];
  }

  get translator() {
    return this.$store.getters["internationalization/getLanguageTexts"];
  }
}
</script>

<style lang="scss"></style>
