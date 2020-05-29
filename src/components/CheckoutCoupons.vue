<template>
  <v-container>
    <v-card
      color="indigo"
      @click="setCoupon(coupon.coupon_id, coupon.coupon_discount_rate)"
    >
      <v-row v-if="coupon.coupon_id === couponIdSelected">
        <v-col class="d-flex justify-center">
          <v-icon color="amber">
            mdi-checkbox-marked-circle
          </v-icon>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card-text
            class="subtitle-1 white--text font-weight-black text-center"
          >
            {{ coupon.coupon_name }}
          </v-card-text>
          <v-card-text
            class="mt-n4 white--text display-3 font-weight-thin text-center"
          >
            {{ coupon.coupon_discount_rate }}
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";

@Component({})
export default class CheckoutCoupons extends Vue {
  select = "Select";
  isCouponSelected = false;

  @Prop() coupon!: any;
  @Prop() couponIdSelected!: number;

  setCoupon(id: number, rate: string) {
    // Se valida si el cupon que se clickeo esta seleecionado y si el id del cupon seleccionado
    //anteriormente es igual al actual. Si es afirmativo, quiere decir que este cupon estaba seleccionado y  ahora se deselecciono
    if (
      this.isCouponSelected &&
      this.$props.couponIdSelected === this.$props.coupon.coupon_id
    ) {
      this.isCouponSelected = false;
    } else if (
      this.isCouponSelected &&
      this.$props.couponIdSelected != this.$props.coupon.coupon_id
    ) {
      this.isCouponSelected = true;
    } else this.isCouponSelected = !this.isCouponSelected;

    if (!this.isCouponSelected) {
      //Si no hay ningun cupon seleccionado se le pasa al padre un id negativo para indicar que no hay cupon seleccionado.
      id = -1;
      rate = "";
    }
    this.$emit("orderCouponId", id);
    this.$emit("orderCouponRate", rate);
  }

  mounted() {
    this.translate();
  }

  @Watch("translator")
  translate() {
    this.translator.forEach((term: any) => {
      switch (term.termName) {
        case "selectText": {
          this.select = term.termTranslation;
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
