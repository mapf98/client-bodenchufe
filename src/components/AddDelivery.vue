<template>
  <v-container>
    <v-card>
      <v-row>
        <v-col class="d-flex justify-center text-center">
          <v-card-title class="indigo--text"
            >Agregar Nueva Direccion</v-card-title
          >
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

@Component({
  components: {
    AddDeliveryForm,
  },
})
export default class AddDeliveries extends Vue {}
</script>

<style lang="scss"></style>
