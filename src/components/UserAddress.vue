<template>
  <v-container>
    <v-expansion-panels multiple focusable hover>
      <v-expansion-panel>
        <v-expansion-panel-header
          class="white--text pa-2"
          expand-icon="mdi-menu-down"
          color="indigo"
        >
          <h1 class="ml-5">{{ userAddress.delivery_address_primary_line }}</h1>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row class="align-center">
            <v-col>
              <v-text-field
                type="text"
                required
                v-model="userAddress.delivery_address_primary_line"
                :disabled="!toEdit"
              ></v-text-field>
              <v-text-field
                type="text"
                required
                v-model="userAddress.delivery_address_secondary_line"
                :disabled="!toEdit"
              ></v-text-field>
              <v-text-field
                type="text"
                required
                v-model="userAddress.delivery_address_city"
                :disabled="!toEdit"
              ></v-text-field>
              <v-text-field
                type="text"
                required
                v-model="userAddress.delivery_address_state"
                :disabled="!toEdit"
              ></v-text-field>
              <v-text-field
                type="text"
                required
                v-model="userAddress.delivery_address_zip_code"
                :disabled="!toEdit"
              ></v-text-field>
              <v-text-field
                type="text"
                required
                v-model="userAddress.delivery_address_aditional_info"
                :disabled="!toEdit"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-row>
                <v-col class="text-center">
                  <v-btn
                    min-width="200"
                    color="indigo"
                    outlined
                    @click="toEdit = true"
                  >
                    <v-icon class="mr-2">mdi-file-multiple</v-icon>
                    Editar
                  </v-btn>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="text-center">
                  <v-btn
                    min-width="200"
                    color="indigo"
                    outlined
                    :disabled="!toEdit"
                  >
                    <v-icon>mdi-check-bold</v-icon>
                    Aceptar
                  </v-btn>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="text-center">
                  <v-btn
                    min-width="200"
                    color="indigo"
                    outlined
                    :disabled="!toEdit"
                    @click="toEdit = false"
                  >
                    <v-icon class="mr-2">x</v-icon>
                    Cancelar
                  </v-btn>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="text-center">
                  <v-btn min-width="200" color="red" outlined>
                    <v-icon>mdi-trash-can-outline</v-icon>
                    Eliminar
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";

@Component({})
export default class UserAddress extends Vue {
  @Prop() userAddress!: any;
  @Prop() toEdit!: any;

  primaryLineText = "Primary Line";
  secondaryLineText = "Secondary Line";
  cityText = "City";
  stateText = "State";
  zipCodeText = "Zip Code";

  @Watch("userAddress")
  show() {
    console.log(this.userAddress);
  }

  itemsTitle = "Click Me1";
}
</script>

<style lang="scss"></style>
