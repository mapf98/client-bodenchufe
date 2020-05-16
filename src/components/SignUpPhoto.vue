<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card-text class="headline">{{ userPhotoTextTitle }}</v-card-text>
      </v-col>
    </v-row>
    <v-row>
      <v-col md="12">
        <v-avatar size="200" color="white">
          <v-icon size="200" v-if="!agregado">mdi-account</v-icon>
          <v-img :src="image" v-if="agregado" contain></v-img>
        </v-avatar>
      </v-col>
    </v-row>
    <v-file-input
      :placeholder="userPhotoTextInput"
      prepend-icon="mdi-camera"
      accept="image/*"
      @change="previewImage"
    ></v-file-input>
  </v-container>
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

  get translator() {
    return this.$store.getters["internationalization/getLanguageTexts"];
  }
}
</script>
