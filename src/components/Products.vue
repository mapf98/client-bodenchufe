<template>
  <v-container fluid>
    <v-row>
      <v-col cols="3">
        <SidebarProduct />
      </v-col>
      <v-col>
        <Product v-for="product in products" :key="product.post_id" v-bind:product="product" />
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
  components:{
    SidebarProduct,
    Product
  }
})
export default class Products extends Vue {

  mounted() {
    this.translate();
  }

  created(){
    if(this.products.length == 0){
      this.$router.push("/categories");
    }
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

  get products(){
    return this.$store.getters["product/getProducts"];
  }

  get translator() {
    return this.$store.getters["internationalization/getLanguageTexts"];
  }
}
</script>

<style lang="scss"></style>
