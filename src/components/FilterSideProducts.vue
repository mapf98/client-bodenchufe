<template>
  <div>
    <v-row
      class="d-flex justify-start indigo px-5 py-2 white--text"
      v-if="filterCategory.categoryChild.length != 0"
    >
      <v-col>
        <div>
          <p class="mb-0 title">{{ filterCategories }}</p>
          <p
            class="mb-0 ml-6 body-2 paths"
            v-for="cat in filterCategory.categoryChild"
            :key="cat.category_id"
            @click="goToCategory(cat.category_id, cat.category_name)"
          >
            {{ cat.category_name }}
          </p>
          <p
            v-if="rootCategory"
            class="mb-0 ml-6 body-2 paths"
            @click="goToCategories"
          >
            {{ otherCategories }}
          </p>
        </div>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-start indigo px-5 py-2 white--text">
      <v-col>
        <div>
          <p class="mb-0 title">Price</p>
          <div class="d-flex justify-start align-center">
            <v-icon color="white" class="ml-6 mr-2">
              mdi-sort-descending
            </v-icon>
            <p class="mb-0 body-2 paths" @click="priceDESC">
              Expensive to cheap
            </p>
          </div>
          <div class="d-flex justify-start align-center">
            <v-icon color="white" class="ml-6 mr-2">
              mdi-sort-ascending
            </v-icon>
            <p class="mb-0 body-2 paths" @click="priceASCE">
              Cheap to expensive
            </p>
          </div>
        </div>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-start indigo px-5 py-2 white--text">
      <v-col>
        <div>
          <p class="mb-0 title">Qualification</p>
          <div class="d-flex justify-start align-center">
            <v-icon color="white" class="ml-6 mr-2">
              mdi-sort-descending
            </v-icon>
            <p class="mb-0 body-2 paths" @click="qualificationDESC">
              5 stars to 0 stars
            </p>
          </div>
          <div class="d-flex justify-start align-center">
            <v-icon color="white" class="ml-6 mr-2">
              mdi-sort-ascending
            </v-icon>
            <p class="mb-0 body-2 paths" @click="qualificationASCE">
              0 stars to 5 stars
            </p>
          </div>
        </div>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-start indigo px-5 py-2 white--text">
      <v-col>
        <div>
          <p class="mb-0 title">Alphabetic</p>
          <div class="d-flex justify-start align-center">
            <v-icon color="white" class="ml-6 mr-2">
              mdi-sort-descending
            </v-icon>
            <p class="mb-0 body-2 paths" @click="alphabeticDESC">
              A to Z
            </p>
          </div>
          <div class="d-flex justify-start align-center">
            <v-icon color="white" class="ml-6 mr-2">
              mdi-sort-ascending
            </v-icon>
            <p class="mb-0 body-2 paths" @click="alphabeticASCE">
              Z to A
            </p>
          </div>
        </div>
      </v-col>
    </v-row>
    <v-row v-if="responsivePanel() && products.length > 1">
      <v-col>
        <div class="d-flex justify-center">
          <v-bottom-sheet v-model="sheet" persistent>
            <template v-slot:activator="{ on }">
              <v-btn
                fixed
                dark
                fab
                small
                bottom
                right
                v-on="on"
                color="amber darken-4"
              >
                <v-icon>mdi-filter-variant</v-icon>
              </v-btn>
            </template>
            <v-sheet height="300" class="d-flex justify-center align-center">
              <div class="mx-5">
                <div class="my-1">
                  <v-btn>
                    Price
                  </v-btn>
                </div>
                <div class="my-1">
                  <v-btn>
                    Stars
                  </v-btn>
                </div>
                <div class="my-1">
                  <v-btn>
                    Order
                  </v-btn>
                </div>
              </div>
              <div class="mx-5">
                <v-btn text color="error" @click="sheet = !sheet">close</v-btn>
              </div>
            </v-sheet>
          </v-bottom-sheet>
        </div>
      </v-col>
    </v-row>
  </div>
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
  sheet = false;

  priceDESC() {
    const items = this.products;
    items.sort(function (a: any, b: any) {
      if (a.product_provider_price < b.product_provider_price) {
        return 1;
      }
      if (a.product_provider_price > b.product_provider_price) {
        return -1;
      }
      return 0;
    });
  }

  priceASCE() {
    const items = this.products;
    items.sort(function (a: any, b: any) {
      if (a.product_provider_price > b.product_provider_price) {
        return 1;
      }
      if (a.product_provider_price < b.product_provider_price) {
        return -1;
      }
      return 0;
    });
  }

  qualificationDESC() {
    const items = this.products;
    items.sort(function (a: any, b: any) {
      let valueA =
        a.avg_qualification_stars == null ? 0 : a.avg_qualification_stars;
      let valueB =
        b.avg_qualification_stars == null ? 0 : b.avg_qualification_stars;
      if (valueA < valueB) {
        return 1;
      }
      if (valueA > valueB) {
        return -1;
      }
      return 0;
    });
  }

  qualificationASCE() {
    const items = this.products;
    items.sort(function (a: any, b: any) {
      let valueA =
        a.avg_qualification_stars == null ? 0 : a.avg_qualification_stars;
      let valueB =
        b.avg_qualification_stars == null ? 0 : b.avg_qualification_stars;
      if (valueA > valueB) {
        return 1;
      }
      if (valueA < valueB) {
        return -1;
      }
      return 0;
    });
  }

  alphabeticDESC() {
    const items = this.products;
    items.sort(function (a: any, b: any) {
      if (a.product_name > b.product_name) {
        return 1;
      }
      if (a.product_name < b.product_name) {
        return -1;
      }
      return 0;
    });
  }

  alphabeticASCE() {
    const items = this.products;
    items.sort(function (a: any, b: any) {
      if (a.product_name < b.product_name) {
        return 1;
      }
      if (a.product_name > b.product_name) {
        return -1;
      }
      return 0;
    });
  }

  responsivePanel() {
    const { xs, sm } = this.$vuetify.breakpoint;
    return xs || sm ? true : false;
  }

  get filterCategory() {
    const paths = this.$store.getters["category/getActualPath"];
    if (paths.length == 1) {
      this.rootCategory = true;
    } else {
      this.rootCategory = false;
    }

    return paths[paths.length - 1] !== undefined
      ? paths[paths.length - 1]
      : { categoryChild: [] };
  }

  goToCategories() {
    this.$router.push("/categories");
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
            this.$store.dispatch("product/getProductByCategory", {
              categoryId: categoryId,
              name: categoryName,
              childCategories: this.$store.getters[
                "category/getChildCategories"
              ],
            });
          });
      });
  }

  mounted() {
    this.translate();
    console.log(this.products);
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

  get products() {
    return this.$store.getters["product/getProducts"];
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

.test {
  position: sticky !important;
  top: 0;
}
</style>
