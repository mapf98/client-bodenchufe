<template>
  <v-container fluid>
    <v-row class="d-flex justify-center grey pa-5 white--text">
      <p v-for="category in categoryPaths" :key="category.categoryId" class="mx-1 paths" @click="goToCategory(category.categoryId)">
        {{category.categoryName}}
      </p>
    </v-row>
    <v-row class="d-flex justify-center align-center indigo pa-5 white--text">
      <p class="mb-0">{{ productPath }}</p>
    </v-row>
    <v-row class="d-flex justify-center amber pa-5 white--text">
      <p class="mb-0">Filtros</p>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";

@Component({})
export default class SidebarProduct extends Vue {

  mounted() {
    this.translate();
  }

  @Watch("translator")
  translate() {
    this.translator.forEach((term: any) => {
      switch (term.termName) {
        // case "categoriesTitle": {
        //   this.categoriesTitle = term.termTranslation;
        //   break;
        // }
        default: {
          break;
        }
      }
    });
  }

  goToCategory(categoryId: number){
    console.log(categoryId);
  }

  get productPath(){
    return this.$store.getters["product/getProductsPath"];
  }

  get categoryPaths(){
    return this.$store.getters["category/getActualPath"];
  }

  get translator() {
    return this.$store.getters["internationalization/getLanguageTexts"];
  }
}
</script>

<style lang="scss">
.paths{
  cursor: pointer;
}

.paths:hover{
  text-decoration: underline;
}
</style>
