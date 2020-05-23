<template>
  <v-row>
    <v-col>
      Test qualifcicatiomn
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Watch, Prop } from "vue-property-decorator";

@Component({})
export default class Qualification extends Vue {
  @Prop() product!: any;
  avg = 0;
  loading = false;

  mounted() {
    this.avg = Math.round(this.product.avg_qualification_stars);
  }

  goToDetail(postId: number) {
    this.loading = true;
    this.$store
      .dispatch("product/getProductDetail", { postId: postId })
      .then(() => {
        this.loading = false;
        //console.log(this.$store.getters["product/getProductDetail"]);
      });
  }
}
</script>

<style lang="scss"></style>
