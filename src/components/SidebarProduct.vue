<template>
  <v-container fluid>
    <CategoryPath @resetFilter="resetFilter" />
    <FilterSideProducts :reset="resetVar" />
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import CategoryPath from "./CategoryPath.vue";
import FilterSideProducts from "./FilterSideProducts.vue";

@Component({
  components: {
    CategoryPath,
    FilterSideProducts,
  },
})
export default class SidebarProduct extends Vue {
  sheet = false;
  resetVar = false;

  resetFilter() {
    this.resetVar = !this.resetVar;
  }
}
</script>

<style lang="scss"></style>
