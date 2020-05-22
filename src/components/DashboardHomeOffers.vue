<template>
  <div>
    <v-row>
      <v-col>
        <div class="d-flex justify-center align-center">
          <p class="mb-0 mr-2 title text-center indigo--text">
            {{ offersTitle }}
          </p>
          <v-icon large color="indigo">
            mdi-clipboard-text-multiple-outline
          </v-icon>
        </div>
        <div class="d-flex justify-center align-center">
          <v-switch
            class="mt-1"
            v-model="showAll"
            :label="showOffers"
            color="indigo"
          ></v-switch>
        </div>
        <v-divider class="amber"></v-divider>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="d-flex justify-center flex-wrap">
        <v-card
          class="mx-3 my-3 indigo darken-3 d-flex justify-center align-center"
          width="250"
          height="250"
          outlined
          v-for="offer in OffersFilter()"
          :key="offer.offer_id"
          @click="productsByOffer(offer.offer_id, offer.offer_rate)"
        >
          <p class="display-4 amber--text font-weight-bold text-center">
            {{ offer.offer_rate }}
          </p>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";

@Component({})
export default class DashboardHomeOffers extends Vue {
  offersTitle = "Offers";
  showOffers = "Show all offers";
  showAll = false;

  mounted() {
    this.translate();
    this.$store.dispatch("home/getOffers");
  }

  @Watch("translator")
  translate() {
    this.translator.forEach((term: any) => {
      switch (term.termName) {
        case "offersTitle": {
          this.offersTitle = term.termTranslation;
          break;
        }
        case "showOffers": {
          this.showOffers = term.termTranslation;
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  productsByOffer(offerId: number, offerRate: string) {
    this.$store
      .dispatch("product/getProductByOffer", {
        offerId: offerId,
        name: offerRate,
      })
      .then(() => {
        this.$store
          .dispatch("category/setActualPath", {
            clear: true,
          })
          .then(() => {
            this.$router.push("/products");
          });
      });
  }

  get translator() {
    return this.$store.getters["internationalization/getLanguageTexts"];
  }

  OffersFilter() {
    const filteredOrders: any[] = [];
    filteredOrders.push();
    if (this.showAll == false) {
      for (
        let index = 0;
        index < (this.offers.length > 4 ? 4 : this.offers.length);
        index++
      ) {
        filteredOrders.push(this.offers[index]);
      }
      return filteredOrders;
    } else {
      return this.offers;
    }
  }

  get offers() {
    return this.$store.getters["home/getOffers"];
  }
}
</script>

<style lang="scss"></style>
