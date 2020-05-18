<template>
  <v-container>
    <v-row class="align-center">
      <v-col class="text-center">
        <v-avatar size="200" color="white">
          <v-icon size="200" v-if="!agregado">mdi-account</v-icon>
          <v-img :src="image" v-if="agregado" contain></v-img>
        </v-avatar>
      </v-col>
    </v-row>
    <v-row class="align-center">
      <v-col class="text-center">
        <v-btn
          @click="$refs.file.click()"
          class="white--text"
          color="indigo"
          :width="buttonCols()"
        >
          <v-icon class="mr-2">mdi-camera</v-icon>
          Change your Photo
        </v-btn>
        <input type="file" ref="file" style="display: none;" accept="image/*" />
      </v-col>
    </v-row>
    <v-row class="align-center">
      <v-col class="text-center">
        <v-btn
          @click="$refs.file.click()"
          class="white--text"
          color="indigo"
          :width="buttonCols()"
        >
          <v-icon class="mr-2">mdi-account-edit</v-icon>
          Save your Changes
        </v-btn>
        <input type="file" ref="file" style="display: none;" accept="image/*" />
      </v-col>
    </v-row>
    <v-row class="align-center">
      <v-col>
        <v-form v-model="valid" ref="form" lazy-validation>
          <v-row>
            <v-col>
              <v-text-field
                type="text"
                v-model="user.userFirstName"
                :label="userFirstNameText"
                :rules="nameRules"
                required
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                type="text"
                v-model="user.userFirstName"
                :label="userSecondNameText"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                type="text"
                v-model="user.userFirstLastname"
                :label="userFirstLastNameText"
                :rules="nameRules"
                required
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                type="text"
                v-model="user.userSecondLastNameText"
                :label="userSecondLastNameText"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                type="text"
                v-model="user.userEmail"
                :label="userEmailText"
                :rules="emailRules"
                disabled
                required
              ></v-text-field>
            </v-col>
            <v-col>
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
                    v-model="user.userBirthdate"
                    :label="userBirthDateText"
                    :rules="birthDateRules"
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
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";

@Component({})
export default class Dashboard extends Vue {
  userFirstNameText = "First Name";
  userSecondNameText = "Second Name";
  userFirstLastNameText = "First Last Name";
  userSecondLastNameText = "Second Last Name";
  userBirthDateText = "Birthday Date";
  userEmailText = "Email ";
  snackbarError = false;
  errors: Array<string> = [];
  valid = true;
  agregado = false;
  menuRef = false;

  userNameRulesLength = "Name must be less than 10 characters";
  userNameRulesRequired = "Name is required";
  userPasswordRulesLength = "Password must be less than 8 characters";
  userPasswordRulesRequired = "Password is required";
  userEmailRulesRequired = "Email is required";
  userEmailRulesValid = "Email must be valid";
  userBirthdayRulesRequired = "Birthday Date is required";
  userEmailRegisteredTrue = "This email is already in use";

  user = {
    userFirstName: "",
    userFirstLastname: "",
    userBirthdate: null,
    userEmail: "",
    userPassword: "",
    userPhoto: "photo",
    languageName: "",
    rolName: "user",
  };

  @Watch("menuRef")
  menu(val: Date) {
    val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
  }

  $refs!: {
    picker: any;
    menu: any;
    form: any;
  };

  nameRules = [
    (v: any) => !!v || this.userNameRulesRequired,
    (v: any) => v.length <= 10 || this.userNameRulesLength,
  ];

  passwordRules = [
    (v: any) => !!v || this.userPasswordRulesRequired,
    (v: any) => v.length >= 8 || this.userPasswordRulesLength,
  ];

  emailRules = [
    (v: any) => !!v || this.userEmailRulesRequired,
    (v: any) => /.+@.+/.test(v) || this.userEmailRulesValid,
  ];

  birthDateRules = [(v: any) => !!v || this.userBirthdayRulesRequired];

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
}
</script>

<style lang="scss"></style>
