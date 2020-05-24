<template>
  <v-carousel cycle height="400" hide-delimiter-background show-arrows-on-hover>
    <v-carousel-item
      v-for="(item, i) in items"
      :key="i"
      :src="item"
      transition="slide-x-transition"
    ></v-carousel-item>
  </v-carousel>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  components: {},
})
export default class DashboardHomeCarousel extends Vue {
  items = [
    "https://firebasestorage.googleapis.com/v0/b/bodenchufe-client.appspot.com/o/images%2Faplication%2Fslide1.jpg?alt=media&token=d9a7394c-6fa2-41e5-9554-4d23e748ce31",
    "https://firebasestorage.googleapis.com/v0/b/bodenchufe-client.appspot.com/o/images%2Faplication%2Fslide2.jpg?alt=media&token=5ebe6565-db3a-436a-9ce0-d34a7672fc74",
    "https://firebasestorage.googleapis.com/v0/b/bodenchufe-client.appspot.com/o/images%2Faplication%2Fslide3.jpg?alt=media&token=89e3e1df-6543-4156-ae55-d1c8cbeaa718",
  ];
}
</script>

<style lang="scss"></style>
