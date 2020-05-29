<template>
  <v-row justify="center">
    <v-dialog v-model="showModal" persistent max-width="490">
      <template v-slot:activator="{ on }">
        <v-btn color="amber darken-2" class="white--text" v-on="on">{{
          rateProductText
        }}</v-btn>
      </template>
      <v-card>
        <v-card-title class="headline">{{ product.product_name }}</v-card-title>
        <v-card-text class="overline mb-4">{{
          product.provider_name
        }}</v-card-text>
        <v-card-text class="indigo--text" v-if="emptyReview">
          {{ reviewTextError }}
        </v-card-text>
        <v-card-text class="indigo--text" v-if="emptyRating">
          {{ ratingTextError }}
        </v-card-text>
        <v-card-text class="indigo--text" v-if="noAvailable">
          {{ approvedTextReview }}
        </v-card-text>
        <v-textarea
          filled
          auto-grow
          v-model="review"
          label="Review"
          rows="4"
          row-height="20"
          class="mx-12"
        ></v-textarea>
        <v-rating
          class="d-flex justify-center mb-5"
          v-model="rating"
          color="yellow darken-3"
          background-color="grey darken-1"
          empty-icon="$ratingFull"
          hover
        ></v-rating>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="indigo" text @click="closeModal">{{ closeText }}</v-btn>
          <v-btn color="indigo" text @click="createRating">{{
            addReviewText
          }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";

@Component({
  components: {},
})
export default class RateProduct extends Vue {
  years = ["All years", "2020", "2019", "2018", "2017"];
  rateProductText = "Rate product";
  reviewTextError = "You must write a review";
  ratingTextError = "You must rate the product";
  approvedTextReview =
    "You can only make a review when the order has been approved or if you have previously purchased the product";
  closeText = "Close";
  addReviewText = "Add review";
  showModal = false;
  review = "";
  rating = 0;
  snackbarError = false;
  emptyReview = false;
  emptyRating = false;
  noAvailable = false;

  @Prop() product!: any;

  mounted() {
    this.translate();
  }

  closeModal() {
    this.showModal = false;
    this.emptyReview = false;
    this.emptyRating = false;
    this.noAvailable = false;
    this.review = "";
    this.rating = 0;
  }

  createRating() {
    this.emptyReview = false;
    this.emptyRating = false;
    this.noAvailable = false;

    if (this.review === "" && this.rating === 0) {
      this.emptyReview = true;
      this.emptyRating = true;
    }
    if (this.review != "" && this.rating === 0) {
      this.emptyReview = false;
      this.emptyRating = true;
    }
    if (this.review === "" && this.rating > 0) {
      this.emptyReview = true;
      this.emptyRating = false;
    }
    if (this.review != "" && this.rating > 0) {
      this.$store
        .dispatch("orderHistory/createRating", {
          qualificationCommentary: this.review,
          qualificationStars: this.rating,
          productId: this.product.product_provider_id,
        })
        .then((res) => {
          if (!res.data.rated) this.noAvailable = true;
          else {
            this.showModal = false;
            this.emptyReview = false;
            this.emptyRating = false;
          }
        });
    }
  }

  @Watch("translator")
  translate() {
    this.translator.forEach((term: any) => {
      switch (term.termName) {
        case "rateProductText": {
          this.rateProductText = term.termTranslation;
          break;
        }
        case "reviewTextError": {
          this.reviewTextError = term.termTranslation;
          break;
        }
        case "ratingTextError": {
          this.ratingTextError = term.termTranslation;
          break;
        }
        case "approvedTextReview": {
          this.approvedTextReview = term.termTranslation;
          break;
        }
        case "closeText": {
          this.closeText = term.termTranslation;
          break;
        }
        case "addReviewText": {
          this.addReviewText = term.termTranslation;
          break;
        }
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
