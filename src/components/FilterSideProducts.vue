<template>
<div>
  <v-row class="d-flex justify-start indigo pa-5 white--text" v-if="filterCategory.categoryChild.length != 0">
    <v-col>
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
              <v-btn
                text
                color="error"
                @click="sheet = !sheet"
              >close</v-btn>
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

.test{
  position: sticky !important;
  top: 0;
}
</style>
