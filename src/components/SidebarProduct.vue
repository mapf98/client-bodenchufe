<template>
  <v-container fluid>
    <CategoryPath />
    <FilterSideProducts />
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";
import CategoryPath from "./CategoryPath.vue";
import FilterSideProducts from "./FilterSideProducts.vue";

@Component({
  components: {
    CategoryPath,
    FilterSideProducts,
  }
})
export default class SidebarProduct extends Vue {}
</script>

<style lang="scss"></style>
