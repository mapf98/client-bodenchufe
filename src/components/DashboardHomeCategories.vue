<template>
  <div>
    <v-row>
      <v-col>
        <div class="d-flex justify-center align-center">
          <p class="mb-0 mr-2 title text-center indigo--text">
            {{ categoriesTitle }}
          </p>
          <v-icon large color="indigo">
            mdi-clipboard-text-multiple-outline
          </v-icon>
        </div>
        <div class="d-flex justify-center align-center">
          <v-switch
            class="mt-1"
            v-model="showAll"
            :label="showCategories"
            color="indigo"
          ></v-switch>
        </div>
        <v-divider class="amber"></v-divider>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="d-flex justify-center flex-wrap">
        <v-card
          class="mx-3 my-3 amber darken-3"
          width="250"
          outlined
          v-for="category in categoriesFilter()"
          :key="category.category_id"
          @click="
            productsByCategory(category.category_id, category.category_name)
          "
        >
          <v-list-item three-line>
            <v-list-item-content
              class="d-flex justify-center white--text font-weight-bold"
            >
              {{ category.category_name.toUpperCase() }}
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";

@Component({})
export default class DashboardHomeCategories extends Vue {
  categoriesTitle = "Main categories";
  showCategories = "Show all categories";
  showAll = false;

  mounted() {
    this.translate();
    this.$store.dispatch("home/getMainCategories");
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
        case "showCategories": {
          this.showCategories = term.termTranslation;
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  productsByCategory(categoryId: number, categoryName: string) {
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

  categoriesFilter() {
    const filteredCategories: any[] = [];
    filteredCategories.push();
    if (this.showAll == false) {
      for (
        let index = 0;
        index <
        (this.mainCategories.length > 8 ? 8 : this.mainCategories.length);
        index++
      ) {
        filteredCategories.push(this.mainCategories[index]);
      }
      return filteredCategories;
    } else {
      return this.mainCategories;
    }
  }

  get translator() {
    return this.$store.getters["internationalization/getLanguageTexts"];
  }

  get mainCategories() {
    return this.$store.getters["home/getMainCategories"];
  }
}
</script>

<style lang="scss"></style>
