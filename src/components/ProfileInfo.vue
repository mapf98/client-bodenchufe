<template>
  <v-container>
    <v-card class="pa-5" elevation="5">
      <v-row>
        <v-col class="text-center">
          <v-avatar size="200" color="white">
            <v-icon size="200" v-if="!agregado">mdi-account</v-icon>
            <v-img :src="userUrlPhoto" v-if="agregado" contain></v-img>
          </v-avatar>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="text-center">
          <v-btn
            @click="$refs.fileInp.click()"
            ref="take"
            class="white--text"
            color="indigo"
            :loading="loading"
            :width="buttonCols()"
          >
            <input
              @change="updateImg"
              type="file"
              ref="fileInp"
              style="display: none;"
              accept="image/*"
            />
            <v-icon class="mr-2">mdi-camera</v-icon>
            {{ changePhotoText }}
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="text-center">
          <v-btn class="white--text" color="indigo" :width="buttonCols()">
            <v-icon class="mr-2">mdi-account-edit</v-icon>
            {{ saveChangeText }}
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-form v-model="valid" ref="form" lazy-validation>
            <v-row>
              <v-col class="mx-8">
                <v-text-field
                  type="text"
                  v-model="user.user_first_name"
                  :label="userFirstNameText"
                  :rules="nameRules"
                  required
                ></v-text-field>
              </v-col>
              <v-col class="mx-8">
                <v-text-field
                  type="text"
                  v-model="user.user_second_name"
                  :label="userSecondNameText"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="mx-8">
                <v-text-field
                  type="text"
                  v-model="user.user_first_lastname"
                  :label="userFirstLastNameText"
                  :rules="nameRules"
                  required
                ></v-text-field>
              </v-col>
              <v-col class="mx-8">
                <v-text-field
                  type="text"
                  v-model="user.user_second_lastname"
                  :label="userSecondLastNameText"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="mx-8">
                <v-text-field
                  type="text"
                  v-model="user.user_email"
                  :label="userEmailText"
                  disabled
                  required
                ></v-text-field>
              </v-col>
              <v-col class="mx-8">
                <v-menu
                  ref="menu"
                  v-model="menuRef"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="user.user_birthdate"
                      :label="userBirthDateText"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    ref="picker"
                    v-model="user.userBirthdate"
                    :max="new Date().toISOString().substr(0, 10)"
                    min="1950-01-01"
                    @change="save"
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
          </v-form>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Watch, Prop } from "vue-property-decorator";

@Component({})
export default class ProfileInfo extends Vue {
  userFirstNameText = "First Name";
  userSecondNameText = "Second Name";
  userFirstLastNameText = "First Last Name";
  userSecondLastNameText = "Second Last Name";
  userBirthDateText = "Birthday Date";
  userEmailText = "Email ";
  changePhotoText = "Change your Photo";
  saveChangeText = "Save your changes";
  snackbarError = false;
  errors: Array<string> = [];
  valid = true;
  agregado = false;
  menuRef = false;
  loading = false;

  userData: any;
  userDataString: any;
  userDataProp!: object;
  userUrlPhoto = "";
  newPhoto: any;
  getdate: any = "";

  userNameRulesLength = "Name must be less than 10 characters";
  userNameRulesRequired = "Name is required";

  user: any = {};

  @Watch("menuRef")
  menu(val: Date) {
    val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
  }

  @Watch("translator")
  translate() {
    this.translator.forEach((term: any) => {
      switch (term.termName) {
        case "userFirstNameText": {
          this.userFirstNameText = term.termTranslation;
          break;
        }
        case "userSecondNameText": {
          this.userSecondNameText = term.termTranslation;
          break;
        }
        case "userFirstLastNameText": {
          this.userFirstLastNameText = term.termTranslation;
          break;
        }
        case "userSecondLastNameText": {
          this.userSecondLastNameText = term.termTranslation;
          break;
        }
        case "userBirthDateText": {
          this.userBirthDateText = term.termTranslation;
          break;
        }
        case "changePhotoText": {
          this.changePhotoText = term.termTranslation;
          break;
        }
        case "saveChangeText": {
          this.saveChangeText = term.termTranslation;
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

  $refs!: {
    picker: any;
    menu: any;
    form: any;
  };

  nameRules = [(v: any) => !!v || this.userNameRulesRequired];

  buttonCols() {
    const { xs, sm } = this.$vuetify.breakpoint;
    return xs ? 280 : sm ? 280 : 350;
  }

  save(date: Date) {
    this.$refs.menu.save(date);
  }

  showErrors(errors: any) {
    this.errors = errors;
    this.snackbarError = true;
  }

  mounted() {
    this.showImageIfExist();
    this.getUserData();
    this.translator;
  }

  updateImg(event: any) {
    if (event) {
      const files = event.target.files[0] || event.dataTransfer.files;
      this.newPhoto = files;
      this.loading = true;
      this.$store
        .dispatch("profile/updateImage", {
          imageUrl: this.userUrlPhoto,
          imageData: this.newPhoto,
          userId: this.user.user_id,
        })
        .then(() => {
          location.reload();
        });
    } else {
      this.agregado = false;
    }
  }

  getUserData() {
    this.$store.dispatch("profile/userData").then(() => {
      this.user = this.getUser;
      this.getdate = this.user.user_birthdate.split("T");
      // eslint-disable-next-line @typescript-eslint/camelcase
      this.user.user_birthdate = this.getdate[0];
    });
  }

  get getUser() {
    return this.$store.getters["profile/getUserData"];
  }

  showImageIfExist() {
    this.userDataString = localStorage.getItem("userData");
    this.userData = JSON.parse(this.userDataString);
    this.userUrlPhoto = this.userData.userPhoto;
    if (this.userUrlPhoto.length > 0) {
      this.agregado = true;
    }
  }
}
</script>

<style lang="scss"></style>
