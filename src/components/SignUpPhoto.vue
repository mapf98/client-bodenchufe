<template>
  <div>
    <v-row class="d-flex justify-center">
      <v-col>
        <v-card-text class="headline text-center">{{
          userPhotoTextTitle
        }}</v-card-text>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-center">
      <v-col class="text-center">
        <v-avatar size="170" color="white" class="flex-wrap">
          <v-icon size="200" v-if="!agregado">mdi-account</v-icon>
          <v-img :src="image" v-if="agregado" contain></v-img>
        </v-avatar>
      </v-col>
    </v-row>
    <v-row>
      <v-file-input
        :placeholder="userPhotoTextInput"
        prepend-icon="mdi-camera"
        accept="image/*"
        class="mx-5"
        @change="previewImage"
      ></v-file-input>
    </v-row>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";

@Component({})
export default class SignUpPhoto extends Vue {
  loading = false;
  userPhotoTextTitle = "Choose your profile picture";
  userPhotoTextInput = "Pick a image";
  image = "";
  userPhoto: any;
  agregado = false;

  //envia la foto al componente padre
  previewImage(event: any) {
    if (event) {
      const files = event || event.dataTransfer.files;
      this.userPhoto = files;
      this.createImg(files);
      this.$emit("imageFiles", files);
    } else {
      this.agregado = false;
    }
  }

  //crea un FileReader para poder mostrar la foto de perfil en la pantalla como preview
  createImg(file: any) {
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.image = e.target.result;
    };
    reader.readAsDataURL(file);
    this.agregado = true;
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
        case "userPhotoTextTitle": {
          this.userPhotoTextTitle = term.termTranslation;
          break;
        }
        case "userPhotoTextInput": {
          this.userPhotoTextInput = term.termTranslation;
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
