<template>
  <v-row>
    <v-col>
      <v-card
        class="mx-auto"
        outlined
        :loading="loading"
        @click="goToDetail(product.post_id)"
      >
        <v-list-item three-line>
          <v-list-item-content>
            <div class="overline mb-4">{{ product.provider_name }}</div>
            <v-list-item-title class="headline mb-1">{{
              product.product_name
            }}</v-list-item-title>
            <v-list-item-subtitle
              >{{ product.product_provider_price }} $</v-list-item-subtitle
            >
          </v-list-item-content>

          <v-list-item-avatar tile size="80">
            <v-img :src="product.product_photo"></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-card-actions>
          <v-rating
            v-model="avg"
            readonly
            color="amber"
            background-color="amber lighten-1"
          ></v-rating>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Watch, Prop } from "vue-property-decorator";

@Component({})
export default class Product extends Vue {
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
        this.$router.push("/detail");
      });
  }
}
</script>

<style lang="scss"></style>
