<template>
  <v-btn
    type="submit"
    class="white--text"
    color="blue"
    rounded
    :width="buttonCols()"
    @click="GoogleFederatedLogIn()"
  >
    {{ loginGoogle }}
    <v-icon right>mdi-google</v-icon>
  </v-btn>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";

@Component({})
export default class GoogleFederatedLogin extends Vue {
  user = {
    userEmail: "",
    userPassword: "",
  };

  loginGoogle = "Login with Google";
  errors: string[] = [];
  nflUserBlocked = "User blocked";
  nflMailNotRegistered = "Mail not registered";
  nflMessageError = "Please correct the following error(s):";

  buttonCols() {
    const { xs, sm } = this.$vuetify.breakpoint;
    return xs ? 280 : sm ? 280 : 350;
  }

  GoogleFederatedLogIn() {
    this.errors.splice(0);

    if (this.errors.length == 0) {
      this.$store
        .dispatch("logIn/federatedLogIn", { provider: "google" })
        .then(() => {
          if (
            this.getStatus.validated == false &&
            this.getStatus.blocked == true &&
            this.getStatus.registered == true
          ) {
            this.errors.push(this.nflUserBlocked);
          }
          if (
            this.getStatus.validated == false &&
            this.getStatus.blocked == false &&
            this.getStatus.registered == false
          ) {
            this.errors.push(this.nflMailNotRegistered);
          }
          if (this.errors.length == 0) {
            this.$store
              .dispatch("internationalization/setUserLanguage")
              .then(() => {
                if (this.productDetails.details !== undefined) {
                  this.$router.push("/detail");
                } else {
                  this.$router.push("/home");
                }
              });
          } else {
            this.$emit("showErrors", this.errors);
          }
        });
    }
  }

  get productDetails() {
    return this.$store.getters["product/getProductDetail"];
  }

  mounted() {
    this.translate();
  }

  //Match para incluir los terminos de poeditor en el modulo
  //En base al lenguaje de preferencia del usuario o el que seleccione en la aplicacion
  @Watch("translator")
  translate() {
    this.translator.forEach((term: any) => {
      switch (term.termName) {
        case "nflUserBlocked": {
          this.nflUserBlocked = term.termTranslation;
          break;
        }
        case "nflMailNotRegistered": {
          this.nflMailNotRegistered = term.termTranslation;
          break;
        }
        case "nflMessageError": {
          this.nflMessageError = term.termTranslation;
          break;
        }
        case "loginGoogle": {
          this.loginGoogle = term.termTranslation;
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

  get getStatus() {
    return this.$store.getters["logIn/getLoginStatus"];
  }
}
</script>
