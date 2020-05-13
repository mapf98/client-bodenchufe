<template>
  <v-autocomplete
    :items="states"
    :filter="customFilter"
    color="white"
    item-text="name"
    :label="searchBoxLabel"
    flat
    hide-no-data
    hide-details
    solo-inverted
  ></v-autocomplete>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";

@Component({})
export default class SearchBox extends Vue {
  searchBoxLabel = "Find the product you want";
  states = [
    { name: "Florida", abbr: "FL", id: 1 },
    { name: "Georgia", abbr: "GA", id: 2 },
    { name: "Nebraska", abbr: "NE", id: 3 },
    { name: "California", abbr: "CA", id: 4 },
    { name: "New York", abbr: "NY", id: 5 },
  ];

  customFilter(item: any, queryText: any, itemText: any) {
    const textOne = item.name.toLowerCase();
    const textTwo = item.abbr.toLowerCase();
    const searchText = queryText.toLowerCase();

    return textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1;
  }

  @Watch("translator")
  translate() {
    const translate = this.$store.state.internationalization.languagesTexts;
    translate.forEach((term: any) => {
      switch (term.termName) {
        case "searchBoxLabel": {
          this.searchBoxLabel = term.termTranslation;
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  get translator() {
    return this.$store.state.internationalization.languagesTexts;
  }
}
</script>

<style lang="scss"></style>
