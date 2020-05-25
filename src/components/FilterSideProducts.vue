<template>
  <div>
    <v-row
      class="d-flex justify-start indigo px-5 py-2 white--text"
      v-if="filterCategory.categoryChild.length != 0"
    >
      <v-col>
        <div>
          <p class="mb-0 subtitle font-weight-bold">
            {{ filterCategory.categoryName }} ({{ filterCategories }})
          </p>
          <p
            class="mb-0 ml-6 body-2 paths"
            v-for="cat in filterCategory.categoryChild"
            :key="cat.category_id"
            @click="goToCategory(cat.category_id, cat.category_name)"
          >
            {{ cat.category_name }}
          </p>
        </div>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-start indigo px-5 py-2 white--text">
      <v-col>
        <div>
          <p class="mb-0 subtitle font-weight-bold">
            {{ mainCategoriesTitle }}
          </p>
          <p
            class="mb-0 ml-6 body-2 paths"
            v-for="cat in mainCategories"
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
    <v-row class="d-flex indigo">
      <v-divider class="amber"></v-divider>
    </v-row>
    <v-row
      class="d-flex justify-start indigo px-5 py-2 white--text"
      v-if="!responsivePanel() && (products.length > 1 || price > 0)"
    >
      <v-col>
        <div>
          <p class="mb-0 subtitle font-weight-bold">{{ priceFilterTitle }}</p>
          <div class="d-flex justify-start align-center mt-1">
            <v-icon color="white">
              mdi-sort-descending
            </v-icon>
            <p class="mb-0 body-2 paths" @click="priceDESC">
              {{ expToCheap }}
            </p>
          </div>
          <div class="d-flex justify-start align-center mt-1">
            <v-icon color="white">
              mdi-sort-ascending
            </v-icon>
            <p class="mb-0 body-2 paths" @click="priceASCE">
              {{ cheapToExp }}
            </p>
          </div>
          <div class="mt-1">
            <div class="d-flex justify-center align-center">
              <v-select
                :items="items"
                dark
                dense
                v-model="priceFilterType"
                class="mr-2"
                :disabled="disableFilter"
              ></v-select>
              <v-text-field
                dark
                dense
                type="number"
                min="1"
                v-model="price"
                :disabled="disableFilter"
              ></v-text-field>
              <p class="mb-0 ml-3 mr-1">$</p>
              <v-btn icon dark @click="filterByPrice" :disabled="disableFilter">
                <v-icon>
                  mdi-filter-variant
                </v-icon>
              </v-btn>
              <v-btn
                icon
                dark
                class="mr-2"
                @click="resetPrice(true)"
                v-if="price > 0"
              >
                <v-icon color="error">
                  mdi-close
                </v-icon>
              </v-btn>
            </div>
            <div class="d-flex justify-center align-center">
              <v-text-field
                dark
                dense
                type="number"
                min="1"
                v-model="minPrice"
                :disabled="disableFilter"
              ></v-text-field>
              <p class="mb-0 mx-2">{{ filterCon }}</p>
              <v-text-field
                dark
                dense
                type="number"
                min="1"
                v-model="maxPrice"
                :disabled="disableFilter"
              ></v-text-field>
              <p class="mb-0 mr-1">$</p>
              <v-btn icon dark @click="filterByRange" :disabled="disableFilter">
                <v-icon>
                  mdi-filter-variant
                </v-icon>
              </v-btn>
              <v-btn
                icon
                dark
                class="mr-2"
                @click="resetPriceRange(true)"
                v-if="minPrice > 0 && maxPrice > 0"
              >
                <v-icon color="error">
                  mdi-close
                </v-icon>
              </v-btn>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
    <v-row
      class="d-flex justify-start indigo px-5 py-2 white--text"
      v-if="!responsivePanel() && products.length > 1"
    >
      <v-col>
        <div>
          <p class="mb-0 subtitle font-weight-bold">
            {{ qualificationFilterTitle }}
          </p>
          <div class="d-flex justify-start align-center mt-1">
            <v-icon color="white">
              mdi-sort-descending
            </v-icon>
            <p class="mb-0 body-2 paths" @click="qualificationDESC">
              {{ fiveToZero }}
            </p>
          </div>
          <div class="d-flex justify-start align-center mt-1">
            <v-icon color="white">
              mdi-sort-ascending
            </v-icon>
            <p class="mb-0 body-2 paths" @click="qualificationASCE">
              {{ zeroToFive }}
            </p>
          </div>
        </div>
        <div class="mt-1">
          <div class="d-flex justify-center align-center">
            <v-select
              :items="items"
              dark
              dense
              v-model="starsFilterType"
              class="mr-2"
              :disabled="disableStarsFilter"
            ></v-select>
            <v-rating v-model="stars" :readonly="disableStarsFilter" dense small color="amber"></v-rating>
            <v-btn icon dark @click="filterByQualification" :disabled="disableStarsFilter">
              <v-icon>
                mdi-filter-variant
              </v-icon>
            </v-btn>
            <v-btn
              icon
              dark
              class="mr-2"
              @click="resetQualification(true)"
              v-if="stars > 0"
            >
              <v-icon color="error">
                mdi-close
              </v-icon>
            </v-btn>
          </div>
          <div class="d-flex justify-center align-center">
            <v-text-field
              dark
              dense
              type="number"
              min="1"
              v-model="minPrice"
              :disabled="disableFilter"
            ></v-text-field>
            <p class="mb-0 mx-2">{{ filterCon }}</p>
            <v-text-field
              dark
              dense
              type="number"
              min="1"
              v-model="maxPrice"
              :disabled="disableFilter"
            ></v-text-field>
            <v-btn icon dark @click="filterByRange" :disabled="disableFilter">
              <v-icon>
                mdi-filter-variant
              </v-icon>
            </v-btn>
            <v-btn
              icon
              dark
              class="mr-2"
              @click="resetPriceRange(true)"
              v-if="minPrice > 0 && maxPrice > 0"
            >
              <v-icon color="error">
                mdi-close
              </v-icon>
            </v-btn>
          </div>
        </div>
      </v-col>
    </v-row>
    <v-row
      class="d-flex justify-start indigo px-5 py-2 white--text"
      v-if="!responsivePanel() && products.length > 1"
    >
      <v-col>
        <div>
          <p class="mb-0 subtitle font-weight-bold">Alphabetic</p>
          <div class="d-flex justify-start align-center">
            <v-icon color="white" class="ml-6 mr-2">
              mdi-sort-descending
            </v-icon>
            <p class="mb-0 body-2 paths" @click="alphabeticDESC">
              {{ aToZ }}
            </p>
          </div>
          <div class="d-flex justify-start align-center">
            <v-icon color="white" class="ml-6 mr-2">
              mdi-sort-ascending
            </v-icon>
            <p class="mb-0 body-2 paths" @click="alphabeticASCE">
              {{ zToA }}
            </p>
          </div>
        </div>
      </v-col>
    </v-row>
    <v-row v-if="responsivePanel() && products.length > 1">
      <v-col>
        <div class="d-flex justify-center">
          <v-bottom-sheet v-model="sheet">
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
            <v-sheet height="auto">
              <div>
                <v-row
                  class="d-flex justify-start indigo px-5 py-2 white--text"
                >
                  <v-col>
                    <div>
                      <p class="mb-0 subtitle font-weight-bold">Price</p>
                      <div class="d-flex justify-start align-center">
                        <v-icon color="white" class="ml-6 mr-2">
                          mdi-sort-descending
                        </v-icon>
                        <p class="mb-0 body-2 paths" @click="priceDESC">
                          {{ fiveToZero }}
                        </p>
                      </div>
                      <div class="d-flex justify-start align-center">
                        <v-icon color="white" class="ml-6 mr-2">
                          mdi-sort-ascending
                        </v-icon>
                        <p class="mb-0 body-2 paths" @click="priceASCE">
                          {{ zeroToFive }}
                        </p>
                      </div>
                    </div>
                  </v-col>
                </v-row>
                <v-row
                  class="d-flex justify-start indigo px-5 py-2 white--text"
                >
                  <v-col>
                    <div>
                      <p class="mb-0 subtitle font-weight-bold">
                        Qualification
                      </p>
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
                          {{ zeroToFive }}
                        </p>
                      </div>
                    </div>
                  </v-col>
                </v-row>
                <v-row
                  class="d-flex justify-start indigo px-5 py-2 white--text"
                >
                  <v-col>
                    <div>
                      <p class="mb-0 subtitle font-weight-bold">Alphabetic</p>
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
              </div>
              <div class="mt-3 d-flex justify-center">
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
  filterCategories = "categories";
  disableFilter = false;
  disableStarsFilter = false;
  rootCategory = false;
  qualificationFilterTitle = "Qualification";
  otherCategories = "Other categories";
  mainCategoriesTitle = "Main categories";
  aToZ = "A to Z";
  zToA = "Z to A";
  sheet = false;
  expToCheap = "Expensive to cheap";
  cheapToExp = "Cheap to expensive";
  fiveToZero = "5 stars to 0 stars";
  zeroToFive = "0 stars to 5 stars";
  priceFilterTitle = "Price";
  providersTitle = "Providers";
  filterCon = "to";
  price = 0;
  minPrice = 0;
  maxPrice = 0;
  items = [
    {
      text: "=",
      value: "equal",
    },
    {
      text: ">",
      value: "mayor",
    },
    {
      text: "<",
      value: "minor",
    },
  ];
  priceFilterType = this.items[0].value;
  stars = 0;
  minStars = 0;
  maxStars = 0;
  starsFilterType = this.items[0].value;

  resetPrice(newSearch: boolean) {
    this.disableFilter = false;
    this.price = 0;
    this.priceFilterType = this.items[0].value;
    if (newSearch) {
      this.categoryNewCall();
    }
  }

  resetPriceRange(newSearch: boolean) {
    this.disableFilter = false;
    this.minPrice = 0;
    this.maxPrice = 0;
    if (newSearch) {
      this.categoryNewCall();
    }
  }

  resetQualification(newSearch: boolean) {
    this.disableStarsFilter = false;
    this.stars = 0;
    this.starsFilterType = this.items[0].value;
    if (newSearch) {
      this.categoryNewCall();
    }
  }

  resetQualificationRange(newSearch: boolean) {
    this.disableStarsFilter = false;
    this.minStars = 0;
    this.maxStars = 0;
    if (newSearch) {
      this.categoryNewCall();
    }
  }

  categoryNewCall() {
    const categoryPath = this.$store.getters["category/getActualPath"];
    const actualCategory = categoryPath[
      categoryPath.length - 1
    ].categoryName.split(" ")[0];
    const categoryId = categoryPath[categoryPath.length - 1].categoryId;
    this.goToCategory(categoryId, actualCategory);
  }

  filterByPrice() {
    this.disableFilter = true;
    if (this.price > 0) {
      const items = this.products;
      let filterItems: any[];
      switch (this.priceFilterType) {
        case "equal": {
          filterItems = items.filter((product: any) => {
            return product.product_provider_price == this.price;
          });
          console.log(filterItems);
          this.$store.commit("product/setProducts", filterItems);
          break;
        }
        case "minor": {
          filterItems = items.filter((product: any) => {
            return product.product_provider_price < this.price;
          });
          console.log(filterItems);
          this.$store.commit("product/setProducts", filterItems);
          break;
        }
        case "mayor": {
          filterItems = items.filter((product: any) => {
            return product.product_provider_price > this.price;
          });
          console.log(filterItems);
          this.$store.commit("product/setProducts", filterItems);
          break;
        }
        default: {
          break;
        }
      }
    } else {
      this.resetPrice(true);
    }
  }

  filterByQualification(){
    this.disableStarsFilter = true;
    if (this.stars > 0) {
      const items = this.products;
      let filterItems: any[];
      switch (this.starsFilterType) {
        case "equal": {
          filterItems = items.filter((product: any) => {
            return Math.round(product.avg_qualification_stars) == this.stars;
          });
          console.log(filterItems);
          this.$store.commit("product/setProducts", filterItems);
          break;
        }
        case "minor": {
          filterItems = items.filter((product: any) => {
            return Math.round(product.avg_qualification_stars) < this.stars;
          });
          console.log(filterItems);
          this.$store.commit("product/setProducts", filterItems);
          break;
        }
        case "mayor": {
          filterItems = items.filter((product: any) => {
            return Math.round(product.avg_qualification_stars) > this.stars;
          });
          console.log(filterItems);
          this.$store.commit("product/setProducts", filterItems);
          break;
        }
        default: {
          break;
        }
      }
    } else {
      this.resetQualification(true);
    }
  }

  filterByRange() {
    if (
      this.minPrice > 0 &&
      this.maxPrice > 0 &&
      this.maxPrice > this.minPrice
    ) {
      const items = this.products;
      const filterItems = items.filter((product: any) => {
        return (
          product.product_provider_price >= this.minPrice &&
          product.product_provider_price <= this.maxPrice
        );
      });
      this.$store.commit("product/setProducts", filterItems);
    } else {
      this.resetPriceRange(true);
    }
  }

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
    this.responsivePanel() && this.products.length > 1
      ? (this.sheet = !this.sheet)
      : (this.sheet = false);
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
    this.responsivePanel() && this.products.length > 1
      ? (this.sheet = !this.sheet)
      : (this.sheet = false);
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
    this.responsivePanel() && this.products.length > 1
      ? (this.sheet = !this.sheet)
      : (this.sheet = false);
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
    this.responsivePanel() && this.products.length > 1
      ? (this.sheet = !this.sheet)
      : (this.sheet = false);
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
    this.responsivePanel() && this.products.length > 1
      ? (this.sheet = !this.sheet)
      : (this.sheet = false);
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
    this.responsivePanel() && this.products.length > 1
      ? (this.sheet = !this.sheet)
      : (this.sheet = false);
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
    this.resetPrice(false);
    this.resetPriceRange(false);
    this.resetQualification(false);
    console.log(categoryId);
    console.log(categoryName);
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
    this.$store.dispatch("home/getMainCategories");
    console.log(this.products);
  }

  get products() {
    return this.$store.getters["product/getProducts"];
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
        case "mainCategoriesTitle": {
          this.mainCategoriesTitle = term.termTranslation;
          break;
        }
        case "filterCon": {
          this.filterCon = term.termTranslation;
          break;
        }
        case "priceFilterTitle": {
          this.priceFilterTitle = term.termTranslation;
          break;
        }
        case "expToCheap": {
          this.expToCheap = term.termTranslation;
          break;
        }
        case "cheapToExp": {
          this.expToCheap = term.termTranslation;
          break;
        }
        case "fiveToZero": {
          this.fiveToZero = term.termTranslation;
          break;
        }
        case "zeroToFive": {
          this.zeroToFive = term.termTranslation;
          break;
        }
        case "aToZ": {
          this.aToZ = term.termTranslation;
          break;
        }
        case "zToA": {
          this.zToA = term.termTranslation;
          break;
        }
        case "qualificationFilterTitle": {
          this.qualificationFilterTitle = term.termTranslation;
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  get mainCategories() {
    return this.$store.getters["home/getMainCategories"];
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
