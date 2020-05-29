<template>
  <v-container>
    <v-card>
      <v-row>
        <v-col class="d-flex justify-center text-center">
          <v-card-title class="indigo--text">{{ addAddresText }}</v-card-title>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <AddDeliveryForm />
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import AddDeliveryForm from "../components/AddDeliveryForm.vue";
import { Watch } from "vue-property-decorator";

@Component({
  components: {
    AddDeliveryForm,
  },
})
export default class AddDeliveries extends Vue {
  addAddresText = "Add Address";

  mounted() {
    this.translate();
  }

  //Match para incluir los terminos de poeditor en el modulo
  //En base al lenguaje de preferencia del usuario o el que seleccione en la aplicacion
  @Watch("translator")
  translate() {
    this.translator.forEach((term: any) => {
      switch (term.termName) {
        case "addAddressText": {
          this.addAddresText = term.termTranslation;
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
