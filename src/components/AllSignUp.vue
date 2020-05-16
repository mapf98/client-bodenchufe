<template>
  <v-container>
    <v-card>
      <v-row>
        <v-col class="d-flex justify-center mt-12">
          <v-btn
            color="indigo"
            class="white--text"
            min-width="300"
            @click="goToNotFederatedSignUp"
            >{{ UsualRegistration }}</v-btn
          >
        </v-col>
      </v-row>

      <v-row>
        <v-col class="d-flex justify-center">
          <v-btn color="indigo" class="white--text" min-width="300">{{
            GoogleRegistration
          }}</v-btn>
        </v-col>
      </v-row>

      <v-row>
        <v-col class="d-flex justify-center">
          <v-btn color="indigo" class="white--text mb-12" min-width="300">{{
            FacebookRegistration
          }}</v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class AllSignUp extends Vue {
  loading = false;
  UsualRegistration = "Registro Habitual";
  GoogleRegistration = "Registro con Google";
  FacebookRegistration = "Registro con Facebook";

  goToNotFederatedSignUp() {
    this.$router.push("/user/signUp/external");
  }
}
</script>
