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
      <v-col>
        <v-card class="justify-center ma-12">
          <v-card-title
            class="justify-center font-weight-bold display-1 indigo--text ma-12"
          >
            {{ changePasswordButtonText }}
          </v-card-title>
          <EditPassword />
        </v-card>
      </v-col>
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

  get translator() {
    return this.$store.getters["internationalization/getLanguageTexts"];
  }
}
</script>

<style lang="scss"></style>
