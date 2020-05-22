<template>
  <div>
    <v-row>
      <v-col>
        <div class="d-flex justify-center align-center mb-2">
          <p class="mb-0 mr-2 title text-center indigo--text">
            {{ providersTitle }}
          </p>
          <v-icon color="indigo" large class="mr-12">
            mdi-storefront-outline
          </v-icon>
          <v-switch
            v-model="showAll"
            :label="showProviders"
            color="indigo"
          ></v-switch>
        </div>
        <v-divider class="amber"></v-divider>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="d-flex justify-center flex-wrap">
        <v-card
          class="mx-3 my-3 indigo"
          width="350"
          height="100"
          outlined
          v-for="provider in providersFilter()"
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

@Component({})
export default class DashboardHomeProviders extends Vue {
  providersTitle = "Providers";
  showProviders = "Show all providers";
  showAll = false;

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
        case "showProviders": {
          this.showProviders = term.termTranslation;
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  productsByProvider(provider: number) {
    //Busqueda de productos por proveedor
    console.log(provider);
  }

  providersFilter() {
    const filteredProviders: any[] = [];
    filteredProviders.push();
    if (this.showAll == false) {
      for (
        let index = 0;
        index < (this.mainProviders.length > 6 ? 6 : this.mainProviders.length);
        index++
      ) {
        filteredProviders.push(this.mainProviders[index]);
      }
      return filteredProviders;
    } else {
      return this.mainProviders;
    }
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
