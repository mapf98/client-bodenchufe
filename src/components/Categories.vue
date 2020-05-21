<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <p class="mb-0 text-center title indigo--text">{{categoriesTitle}}</p>
        <v-divider class="amber mt-2"></v-divider>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="d-flex justify-center flex-wrap">
        <v-card v-for="cat in categories" :key="cat.id" elevation="5" class="ma-5 pa-5">
          <p class="indigo--text title">{{cat.name}}</p>
          <v-treeview
            open-on-click
            selectable
            return-object
            open-all
            expand-icon="mdi-chevron-down"
            on-icon="mdi-card-search-outline"
            off-icon="mdi-card-search-outline"
            indeterminate-icon="mdi-card-search-outline"
            v-model="selection"
            :items="cat.children"
          ></v-treeview>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";

@Component({})
export default class Categories extends Vue {
  categoriesTitle = "Categories";
  selection: any[] = [];

  @Watch("selection")
  getProductsByCategory(){
    if(this.selection[0] !== undefined){
      const categoryId = this.selection[0].id;
      this.$store.dispatch("product/getProductByCategory", {categoryId: categoryId, name:this.selection[0].name}).then(()=>{
        this.$store.dispatch("category/setActualPath", {paths: this.getFinalPaths(categoryId)}).then(()=>{
          this.$router.push("/products");
        });
      });
    }
  }

  mounted() {
    this.translate();
    this.$store.dispatch("category/getCategories").then(()=>{
      const categories = this.$store.getters["category/getCategories"];
    });
  }

  @Watch("translator")
  translate() {
    this.translator.forEach((term: any) => {
      switch (term.termName) {
        case "categoriesTitle": {
          this.categoriesTitle = term.termTranslation;
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  setCategories(categories: any){
    const recursiveCategory: any = [];
    categories.forEach((category:any) => {
      recursiveCategory.push({
        id: category.category_id,
        name: category.category_name,
        children: this.setCategories(category.category_child),
      });
    });
    return recursiveCategory;
  }

  getFKID(id: number, categories: any[]){
    let FID = -1;
    for (let index = 0; index < categories.length; index++) {
      if (id == categories[index].category_id) {
        FID = categories[index].fk_category_id;
      }

      if(this.getFKID(id, categories[index].category_child) !== -1 && FID == -1){
        FID = this.getFKID(id, categories[index].category_child);
      }      
    }
    return FID;
  }

  getFKPaths(id: number, categories: any[]){
    let fk = id;
    const paths = [];

    paths.push(fk);
    
    for (let index = 0; fk !== null; index++) {
      fk = this.getFKID(fk, categories);
      if(fk !== null){
        paths.push(fk);
      }      
    }

    return paths;
  }

  getPathNameID(id: number, categories: any[]){
    let namePath = "";
    for (let index = 0; index < categories.length; index++) {
      if (id == categories[index].category_id) {
        namePath = categories[index].category_name;
      }

      if(this.getPathNameID(id, categories[index].category_child) !== ""  && namePath == ""){
        namePath = this.getPathNameID(id, categories[index].category_child);
      }      
    }
    return namePath;
  }

  getFinalPaths(id: number){
    const categories = this.$store.getters["category/getCategories"];
    const fkPaths = this.getFKPaths(id, categories).reverse();;
    const finalPaths: any[] = [];
    
    for (let index = 0; index < fkPaths.length; index++) {
      finalPaths.push({
        categoryName: `${this.getPathNameID(fkPaths[index], categories)} ${fkPaths.length-index == 1 ? "":">"}`,
        categoryId: fkPaths[index]
      });        
    }

    return finalPaths;
  }

  get categories(){
    const categories = this.$store.getters["category/getCategories"];
    return this.setCategories(categories)
  }

  get translator() {
    return this.$store.getters["internationalization/getLanguageTexts"];
  }
}
</script>

<style lang="scss"></style>
