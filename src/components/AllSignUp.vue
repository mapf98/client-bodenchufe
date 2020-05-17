<template>
  <v-container>
    <v-card>
      <v-row>
        <v-col class="d-flex justify-center mt-12">
          <v-btn
            color="amber"
            class="white--text"
            rounded
            :width="buttonCols()"
            @click="goToNotFederatedSignUp"
            >{{ UsualRegistration }}</v-btn
          >
        </v-col>
      </v-row>

      <v-row class="text-center">
        <v-col class="d-flex justify-center">
          <GoogleFederatedSignUp />
        </v-col>
      </v-row>

      <v-row class="text-center">
        <v-col class="d-flex justify-center mb-12">
          <FacebookFederatedSignUp />
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";
import GoogleFederatedSignUp from "./GoogleFederatedSignUp.vue";
import FacebookFederatedSignUp from "./FacebookFederatedSignUp.vue";

@Component({
  components: {
    GoogleFederatedSignUp,
    FacebookFederatedSignUp,
  },
})
export default class AllSignUp extends Vue {
  loading = false;
  UsualRegistration = "Usual Registration";
  FacebookRegistration = "Registro con Facebook";

  buttonCols() {
    const { xs, sm } = this.$vuetify.breakpoint;
    return xs ? 280 : sm ? 280 : 350;
  }

  goToNotFederatedSignUp() {
    this.$router.push("/user/signUp/external");
  }

  mounted() {
    this.translate();
  }

  @Watch("translator")
  translate() {
    this.translator.forEach((term: any) => {
      switch (term.termName) {
        case "UsualRegistration": {
          this.UsualRegistration = term.termTranslation;
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
