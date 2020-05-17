<template>
  <div>
    <v-row>
      <v-col>
        <p class="mb-0 title text-center indigo--text">{{ providersTitle }}</p>
        <v-divider class="amber"></v-divider>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="d-flex justify-space-around flex-wrap">
        <v-card
          class="mx-3 my-3 indigo"
          width="350"
          height="100"
          outlined
          v-for="provider in mainProviders"
          :key="provider.provider_id"
          @click="productsByProvider(provider.provider_id)"
        >
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="headline mb-1 white--text">{{
                provider.provider_name
              }}</v-list-item-title>
              <v-list-item-subtitle class="white--text">{{
                provider.provider_description
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";

@Component({
  components: {},
})
export default class DashboardHomeProviders extends Vue {
  providersTitle = "Providers";
  mounted() {
    this.translate();
    this.$store.dispatch("home/getMainProviders");
  }

  @Watch("translator")
  translate() {
    this.translator.forEach((term: any) => {
      switch (term.termName) {
        case "providersTitle": {
          this.providersTitle = term.termTranslation;
          break;
        }
        // case "navbarLogin": {
        //   this.navbarLogin = term.termTranslation;
        //   break;
        // }
        // case "navbarSingUp": {
        //   this.navbarSingUp = term.termTranslation;
        //   break;
        // }
        default: {
          break;
        }
      }
    });
  }

  productsByProvider(provider: number) {
    console.log(provider);
  }

  get translator() {
    return this.$store.getters["internationalization/getLanguageTexts"];
  }

  get mainProviders() {
    return this.$store.getters["home/getMainProviders"];
  }
}
</script>

<style lang="scss"></style>
