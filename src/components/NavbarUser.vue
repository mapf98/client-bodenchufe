<template>
  <div>
    <div class="hidden-sm-and-down">
      <v-menu offset-y open-on-hover>
        <template v-slot:activator="{ on }">
          <div
            class="d-flex justify-center align-center navbarUser px-8 py-1"
            v-on="on"
          >
            <v-avatar height="48" width="48" class="mx-3">
              <v-img
                :src="userPhoto"
                :alt="userName"
                :contain="userPhoto == placeHolcerImg"
              >
                <template v-slot:placeholder>
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-progress-circular
                      indeterminate
                      color="indigo lighten-2"
                    ></v-progress-circular>
                  </v-row>
                </template>
              </v-img>
            </v-avatar>
            <p class="body-2 mb-0 mx-3">{{ userName }}</p>
            <v-badge
              color="amber darken-3"
              :content="userProducts"
              overlap
              class="mx-3"
              :value="userProducts"
            >
              <v-icon color="indigo">
                mdi-cart-outline
              </v-icon>
            </v-badge>
          </div>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            @click="pushTo(item.route)"
          >
            <v-list-item-title class="d-flex justify-start align-center">
              <v-icon class="mr-1" color="indigo">{{ item.icon }}</v-icon>
              <p class="mb-0">{{ item.title }}</p></v-list-item-title
            >
          </v-list-item>
          <v-list-item @click="logOut">
            <v-list-item-title class="d-flex justify-start align-center">
              <v-icon class="mr-1" color="error">mdi-logout</v-icon>
              <p class="mb-0 error--text">{{ signOffText }}</p>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
    <div class="hidden-md-and-up">
      <div class="d-flex justify-center align-center pa-2 mx-4">
        <v-avatar height="75" width="75" class="mr-12">
          <v-img :src="userPhoto" :alt="userName">
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="indigo lighten-2"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>
        </v-avatar>
        <v-badge
          color="amber darken-3"
          :content="userProducts"
          :value="userProducts"
          overlap
        >
          <v-icon color="indigo" large>
            mdi-cart-outline
          </v-icon>
        </v-badge>
      </div>
      <div class="d-flex justify-center mt-3 mb-5">
        <p class="body-2 mb-0 ml-4 mr-4">{{ userName }}</p>
      </div>
      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          @click="pushTo(item.route)"
        >
          <v-list-item-title class="d-flex justify-start align-center">
            <v-icon class="mr-1" color="indigo">{{ item.icon }}</v-icon>
            <p class="mb-0">{{ item.title }}</p></v-list-item-title
          >
        </v-list-item>
        <v-list-item @click="logOut">
          <v-list-item-title class="d-flex justify-start align-center">
            <v-icon class="mr-1" color="error">mdi-logout</v-icon>
            <p class="mb-0 error--text">{{ signOffText }}</p>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";

@Component({})
export default class NavbarUser extends Vue {
  userPhoto = "";
  userName = "";
  signOffText = "Log out";
  placeHolcerImg =
    "https://firebasestorage.googleapis.com/v0/b/bodenchufe-client.appspot.com/o/images%2Faplication%2FFotofinal.png?alt=media&token=d9d54e10-3ad2-4906-8986-890b38a27d38";

  items = [
    { title: "My profile", icon: "mdi-account", route: "/profile" },
    {
      title: "My shopping cart",
      icon: "mdi-cart-outline",
      route: "/shoppingCart",
    },
    {
      title: "My orders",
      icon: "mdi-package-variant-closed",
      route: "/orderHistory",
    },
    { title: "My coupons", icon: "mdi-wallet-giftcard", route: "/coupons" },
    {
      title: "My delivery addresses",
      icon: "mdi-truck-delivery-outline",
      route: "/delivery",
    },
  ];

  pushTo(route: string) {
    this.$router.push(route);
  }

  logOut() {
    localStorage.clear();
    this.$router.currentRoute.path != "/home"
      ? this.$router.push("/home")
      : false;
    location.reload();
  }

  mounted() {
    this.$store;
    const userData: any = localStorage.getItem("userData");
    this.userPhoto =
      JSON.parse(userData).userPhoto == "photo"
        ? this.placeHolcerImg
        : JSON.parse(userData).userPhoto;
    this.userName = `${JSON.parse(userData).userName}`;
    this.translate();
  }

  goToProfile() {
    this.$router.push("/login");
  }

  @Watch("translator")
  translate() {
    this.translator.forEach((term: any) => {
      switch (term.termName) {
        case "userProfile": {
          this.items[0].title = term.termTranslation;
          break;
        }
        case "userShoppingCart": {
          this.items[1].title = term.termTranslation;
          break;
        }
        case "userOrders": {
          this.items[2].title = term.termTranslation;
          break;
        }
        case "userCoupons": {
          this.items[3].title = term.termTranslation;
          break;
        }
        case "userDeliveryAddress": {
          this.items[4].title = term.termTranslation;
          break;
        }
        case "signOffText": {
          this.signOffText = term.termTranslation;
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

  get userProducts() {
    return this.$store.getters["shoppingCart/getProductsBadge"];
  }

  @Watch("userNewPhoto")
  updatePhoto() {
    const userData: any = localStorage.getItem("userData");
    this.userPhoto =
      JSON.parse(userData).userPhoto == "photo"
        ? this.placeHolcerImg
        : JSON.parse(userData).userPhoto;
  }

  get userNewPhoto() {
    return this.$store.getters["profile/getNewUserPhoto"];
  }
}
</script>

<style lang="scss">
.navbarUser {
  border: 1px solid black;
  border-radius: 4px;
}
</style>
