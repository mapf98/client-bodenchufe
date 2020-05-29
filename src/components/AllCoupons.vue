<template>
  <v-container fluid>
    <v-card
      class="d-flex align-center flex-wrap"
      width="100%"
      color="#3949AB"
      tile
    >
      <v-col>
        <v-card-text class="white--text display-1">{{
          couponTitleText
        }}</v-card-text>
      </v-col>
    </v-card>
    <v-row class="d-flex justify-center">
      <v-col
        :cols="separatorCols()"
        v-for="coupon of userCoupons"
        :key="coupon.coupon_id"
      >
        <UserCoupon :userCoupon="coupon" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import UserCoupon from "../components/UserCoupon.vue";
import { Watch } from "vue-property-decorator";

@Component({
  components: {
    UserCoupon,
  },
})
export default class AllCoupons extends Vue {
  coupons = [];
  couponTitleText = "My coupons";

  separatorCols() {
    const { xs, sm } = this.$vuetify.breakpoint;
    return xs || sm ? 12 : 3;
  }

  getUserCoupons() {
    this.$store.dispatch("coupon/getUserCoupon");
  }

  get userCoupons() {
    return this.$store.getters["coupon/getUserCoupons"];
  }

  mounted() {
    this.translate();
    this.getUserCoupons();
  }

  //Match para incluir los terminos de poeditor en el módulo
  //En base al lenguaje de preferencia del usuario o el que seleccione en la aplicación
  @Watch("translator")
  translate() {
    this.translator.forEach((term: any) => {
      switch (term.termName) {
        case "userCoupons": {
          this.couponTitleText = term.termTranslation;
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  //Getter de todos los terminos almacenados en PoEditor
  get translator() {
    return this.$store.getters["internationalization/getLanguageTexts"];
  }
}
</script>

<style lang="scss"></style>
