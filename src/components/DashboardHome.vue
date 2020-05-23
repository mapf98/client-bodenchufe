<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <DashboardHomeCarousel />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <DashboardHomeProviders />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <DashboardHomeCategories />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <DashboardHomeOffers />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";
import DashboardHomeCarousel from "../components/DashboardHomeCarousel.vue";
import DashboardHomeCategories from "../components/DashboardHomeCategories.vue";
import DashboardHomeOffers from "../components/DashboardHomeOffers.vue";
import DashboardHomeProviders from "../components/DashboardHomeProviders.vue";

@Component({
  components: {
    DashboardHomeCarousel,
    DashboardHomeCategories,
    DashboardHomeOffers,
    DashboardHomeProviders,
  },
})
export default class DashboardHome extends Vue {
  mounted() {
    window.scrollTo(0,0);
    this.$store.dispatch("shoppingCart/getShoppingCartProducts");
  }
}
</script>

<style lang="scss"></style>
