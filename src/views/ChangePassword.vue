<template>
  <v-container>
    <v-row>
      <v-col class="d-flex justify-center">
        <router-link to="/profile">
          <v-img src="../assets/logoBodenchufe.png" max-width="300"></v-img
        ></router-link>
      </v-col>
    </v-row>
    <v-row>
      <v-col :cols="separatorCols()"></v-col>
      <v-col :cols="separatorCols()">
        <v-card>
          <v-card-title
            class="d-flex justify-center text-center font-weight-bold title indigo--text"
          >
            {{ changePasswordButtonText }}
          </v-card-title>
          <EditPassword />
        </v-card>
      </v-col>
      <v-col :cols="separatorCols()"></v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import EditPassword from "../components/EditPassword.vue";
import { Watch } from "vue-property-decorator";

@Component({
  components: {
    EditPassword,
  },
})
export default class ChangePassword extends Vue {
  changePasswordButtonText = "Change your password";

  mounted() {
    this.translate();
  }

  @Watch("translator")
  translate() {
    this.translator.forEach((term: any) => {
      switch (term.termName) {
        case "changePasswordButtonText": {
          this.changePasswordButtonText = term.termTranslation;
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  separatorCols() {
    const { xs, sm } = this.$vuetify.breakpoint;
    return xs || sm ? 12 : 4;
  }

  get translator() {
    return this.$store.getters["internationalization/getLanguageTexts"];
  }
}
</script>

<style lang="scss"></style>
