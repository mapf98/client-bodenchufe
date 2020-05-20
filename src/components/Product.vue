<template>
  <v-container fluid>
    <v-row>
      {{product.product_name}}
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Watch, Prop } from "vue-property-decorator";

@Component({})
export default class Product extends Vue {
  @Prop() product!: any;

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

  get translator() {
    return this.$store.getters["internationalization/getLanguageTexts"];
  }
}
</script>

<style lang="scss"></style>
