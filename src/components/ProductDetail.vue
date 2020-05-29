<template>
  <v-container fluid>
    <v-row>
      <p
        v-for="category in productPath"
        :key="category.categoryId"
        class="my-1 mx-1 paths text-center indigo--text"
        @click="goToCategory(category.categoryId, category.categoryName)"
      >
        {{ category.categoryName }}
      </p>
      <p class="my-1 mx-1">> {{ productDetails.product_name }}</p>
    </v-row>
    <v-row>
      <v-chip
        class="ma-2"
        color="primary"
        v-if="productDetails.offer_rate !== null"
        @click="
          productsByOffer(productDetails.offer_id, productDetails.offer_rate)
        "
      >
        {{ chipOffer1 }} {{ productDetails.offer_rate }} {{ chipOffer2 }}
      </v-chip>
      <v-chip
        class="ma-2"
        color="primary"
        @click="
          productsByProvider(
            productDetails.provider_id,
            productDetails.provider_name
          )
        "
      >
        {{ chipProviderDetail }} {{ productDetails.provider_name }}
      </v-chip>
    </v-row>
    <v-row class="d-flex justify-center align-center">
      <v-col :cols="detailCols()">
        <v-row class="d-flex justify-center align-center">
          <v-col
            :cols="rowPreviews()"
            :class="
              rowPreview() == false ? `` : `d-flex justify-center align-center`
            "
          >
            <div
              v-for="preview in productsUrlImages"
              :key="preview"
              :class="
                rowPreview() == false
                  ? `my-1 preview d-flex justify-center ${
                      preview == productPhoto ? `selectedPreview` : ``
                    }`
                  : `mx-1 preview d-flex justify-center ${
                      preview == productPhoto ? `selectedPreview` : ``
                    }`
              "
              @click="showPhoto(preview)"
            >
              <v-img :src="preview" height="60" width="60" contain></v-img>
            </div>
          </v-col>
          <v-col class="d-flex justify-center">
            <v-img :src="productPhoto" height="400" width="400" contain></v-img>
          </v-col>
        </v-row>
      </v-col>
      <v-col :cols="detailCols()">
        <v-card outlined elevation="5">
          <div class="d-flex justify-center">
            <p class="mb-0 title indigo--text ma-2 text-center">
              {{ productDetails.product_name }}
            </p>
          </div>
          <v-divider class="mx-12 amber"></v-divider>
          <v-row
            class="d-flex justify-center align-center mt-8"
            v-if="productDetails.offer_rate !== null"
          >
            <v-col class="d-flex justify-center align-center">
              <p class="mb-0 mx-2 title discountAmout">
                {{ productDetails.product_provider_price }}$
              </p>
              <p class="mb-0 title success--text">
                (-{{ productDetails.offer_rate }})
              </p>
            </v-col>
          </v-row>
          <v-row class="mt-6">
            <v-col class="d-flex justify-center align-center">
              <p class="mb-0 display-1 indigo--text">
                {{ totalCost(productDetails.offer_rate) }}$
              </p>
            </v-col>
          </v-row>
          <div class="d-flex justify-center align-center mt-8">
            <p class="mb-0 mr-2 title indigo--text font-weight-bold">
              {{ avg }}.0
            </p>
            <v-rating
              v-model="avg"
              readonly
              dense
              small
              color="amber"
              background-color="amber lighten-1"
            ></v-rating>
          </div>
          <p
            class="mb-0 mt-6 text-center indigo--text font-weight-bold"
            v-if="productDetails.product_provider_available_quantity > 0"
          >
            {{ availableQuantity }}
            {{ productDetails.product_provider_available_quantity }}
          </p>
          <p
            class="mb-0 mt-6 text-center error--text font-weight-bold"
            v-if="productDetails.product_provider_available_quantity == 0"
          >
            {{ availableQuantity }}
            {{ productDetails.product_provider_available_quantity }}
          </p>
          <v-divider class="indigo mt-3"></v-divider>
          <v-card-actions class="d-flex justify-space-around align-center py-3">
            <v-row v-if="!added">
              <v-col class="d-flex justify-center align-center">
                <v-btn
                  color="amber darken-3"
                  class="white--text"
                  @click="addProduct"
                  :loading="addProductLoading"
                  :disabled="
                    productDetails.product_provider_available_quantity == 0
                  "
                >
                  {{ addToCart }}
                  <v-icon>
                    mdi-cart-arrow-down
                  </v-icon>
                </v-btn>
              </v-col>
              <v-col>
                <div class="d-flex justify-center align-center">
                  <v-btn
                    icon
                    color="indigo darken-3"
                    @click="incrementQuantity"
                  >
                    <v-icon>mdi-cart-plus</v-icon>
                  </v-btn>
                  <p class="mb-0 mx-2">{{ productQ }} {{ quantity }}</p>
                  <v-btn
                    icon
                    color="indigo darken-3"
                    @click="decrementQuantity"
                  >
                    <v-icon>mdi-cart-minus</v-icon>
                  </v-btn>
                </div>
              </v-col>
            </v-row>
            <v-row v-if="added">
              <v-col class="d-flex justify-center">
                <v-btn color="indigo" dark @click="goToShoppingCart">
                  {{ seeSC }}
                  <v-icon class="ml-2">mdi-cart-outline</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card outlined>
          <v-card-title>
            <v-icon color="indigo" large>
              mdi-storefront-outline
            </v-icon>
            <p class="mb-0 ml-2 headline">{{ productDetails.provider_name }}</p>
          </v-card-title>
          <v-card-text>
            <p class="mb-0 subtitle-1">
              {{ productDetails.product_description }}
            </p>
            <p class="mb-0 subtitle-1">
              {{ productDetails.product_provider_description }}
            </p>
            <p class="mb-0 mt-6 subtitle-1">
              {{ productLong }} {{ productDetails.product_long }}
            </p>
            <p class="mb-0 subtitle-1">
              {{ productH }} {{ productDetails.product_height }}
            </p>
            <p class="mb-0 subtitle-1">
              {{ productW }} {{ productDetails.product_width }}
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <div class="d-flex justify-start align-center mt-8">
          <p class="mb-0 display-3 mr-2 indigo--text">{{ avg }}.0</p>
          <v-rating
            v-model="avg"
            readonly
            dense
            color="amber"
            background-color="amber lighten-1"
          ></v-rating>
        </div>
        <div class="d-flex mt-1 justify-start align-center">
          <p class="mb-0 ml-2 subtitle-1">
            {{ qualifications.length }} {{ detailQualification }}
          </p>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card
          outlined
          dark
          class="my-3 pa-3 indigo"
          v-for="qualification in qualifications"
          :key="qualification.qualification_id"
        >
          <p class="mb-0 ml-1">{{ qualification.qualification_commentary }}</p>
          <v-rating
            v-model="qualification.qualification_stars"
            readonly
            dense
            color="amber"
            background-color="amber lighten-1"
            small
          ></v-rating>
        </v-card>
        <div v-if="qualifications.length == 0">
          <p class="mb-0 title text-center mt-2">{{ detailOpinions }}</p>
          <div class="d-flex justify-center mt-2">
            <v-icon large color="indigo">
              mdi-information-outline
            </v-icon>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";
import CategoryPath from "../components/CategoryPath.vue";
import { fs } from "../firebase";

@Component({
  components: {
    CategoryPath,
  },
})
export default class ProductDetail extends Vue {
  avg = 0;
  quantity = 1;
  added = false;
  addProductLoading = false;
  productQ = "Quantity:";
  productsUrlImages: any = [];
  productPath: any = [];
  productPhoto = this.productDetails.product_photo;
  availableQuantity = "Quantity available:";
  productLong = "Length:";
  chipProviderDetail = "Provider";
  chipOffer1 = "Products with";
  chipOffer2 = "discount";
  productW = "Width:";
  productH = "Heigth:";
  detailQualification = "opinions";
  detailOpinions = "No opinions registered";
  addToCart = "Add to shopping cart";
  seeSC = "Go to shopping cart";
  productsOnShoppingCart: any = [];

  getProductImages(productId: number) {
    this.productsUrlImages.length = 0;
    const storage = fs;
    const storageRef = storage.ref();

    storageRef
      .child(`/images/products/${productId}/`)
      .listAll()
      .then((res: any) => {
        res.items.forEach((itemRef: any) => {
          itemRef.getDownloadURL().then((downloadUrl: any) => {
            this.productsUrlImages.push(downloadUrl);
          });
        });
      });
  }

  productsByProvider(providerId: number, providerName: string) {
    this.$store
      .dispatch("product/getProductByProvider", {
        providerId: providerId,
        name: providerName,
      })
      .then(() => {
        this.$store
          .dispatch("category/setActualPath", {
            clear: true,
          })
          .then(() => {
            this.$router.push("/products");
          });
      });
  }

  productsByOffer(offerId: number, offerRate: string) {
    this.$store
      .dispatch("product/getProductByOffer", {
        offerId: offerId,
        name: offerRate,
      })
      .then(() => {
        this.$store
          .dispatch("category/setActualPath", {
            clear: true,
          })
          .then(() => {
            this.$router.push("/products");
          });
      });
  }

  showPhoto(photo: string) {
    this.productPhoto = photo;
  }

  mounted() {
    if (localStorage.getItem("token") !== null) {
      this.$store.dispatch("shoppingCart/getShoppingCartProducts").then(() => {
        this.productsOnShoppingCart = this.$store.getters[
          "shoppingCart/getProducts"
        ];
        this.productsOnShoppingCart.forEach((product: any) => {
          if (product.fk_product_provider_id == this.productDetails.post_id) {
            this.added = true;
          }
        });
      });
    }
    this.avg = Math.round(this.productDetails.avg_qualification_stars);
    this.translate();
    window.scrollTo(0, 0);
  }

  beforeCreate() {
    this.$store
      .dispatch("product/checkPostId", this.$route.params.productId)
      .then((res: any) => {
        if (res == true) {
          if (
            this.$store.getters["product/getProductDetail"].details ===
            undefined
          ) {
            this.$store.dispatch("product/getProductDetail", {
              postId: this.$route.params.productId,
            });
          }
        } else {
          this.$router.push("/notFound");
        }
      });
  }

  created() {
    if (this.productDetails.post_id != 0) {
      this.getProductImages(this.productDetails.product_id);
      const categories = this.$store.getters["category/getCategories"];
      this.$store
        .dispatch("category/setActualPath", {
          categoryId: this.productDetails.category_id,
          categories: categories,
        })
        .then(() => {
          this.productPath = this.$store.getters["category/getActualPath"];
        });
    }
  }

  @Watch("productDetails")
  refreshData() {
    if (this.productDetails.post_id != 0) {
      this.getProductImages(this.productDetails.product_id);
      this.productPhoto = this.productDetails.product_photo;
      this.avg = Math.round(this.productDetails.avg_qualification_stars);
      this.$store.dispatch("category/getCategories").then(() => {
        const categories = this.$store.getters["category/getCategories"];
        this.$store
          .dispatch("category/setActualPath", {
            categoryId: this.productDetails.category_id,
            categories: categories,
          })
          .then(() => {
            this.productPath = this.$store.getters["category/getActualPath"];
          });
      });
    }
  }

  goToCategory(categoryId: number, categoryName: string) {
    const categories = this.$store.getters["category/getCategories"];
    this.$store
      .dispatch("category/setActualPath", {
        categoryId: categoryId,
        categories: categories,
      })
      .then(() => {
        this.$store
          .dispatch("category/getChildCategories", {
            categoryId: categoryId,
            categories: categories,
          })
          .then(() => {
            this.$store
              .dispatch("product/getProductByCategory", {
                categoryId: categoryId,
                name: categoryName.split(" ")[0],
                childCategories: this.$store.getters[
                  "category/getChildCategories"
                ],
              })
              .then(() => {
                this.$router.push("/products");
              });
          });
      });
  }

  incrementQuantity() {
    if (
      this.quantity < this.productDetails.product_provider_available_quantity
    ) {
      this.quantity++;
    }
  }

  decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  detailCols() {
    const { xs, sm } = this.$vuetify.breakpoint;
    return xs || sm ? 12 : 6;
  }

  rowPreview() {
    const { xs, sm } = this.$vuetify.breakpoint;
    return xs || sm ? true : false;
  }

  rowPreviews() {
    const { xs, sm } = this.$vuetify.breakpoint;
    return xs || sm ? 12 : 2;
  }

  financial(number: any) {
    return Number.parseFloat(number).toFixed(2);
  }

  totalCost(offerRate: string) {
    if (offerRate !== null) {
      const offer = offerRate.split("%")[0];
      const discount =
        (this.productDetails.product_provider_price * parseInt(offer)) / 100;
      return this.financial(
        this.productDetails.product_provider_price - discount
      );
    } else {
      return this.productDetails.product_provider_price;
    }
  }

  addProduct() {
    this.addProductLoading = true;
    if (localStorage.getItem("token") !== null) {
      this.$store
        .dispatch("shoppingCart/addProduct", {
          postId: this.productDetails.post_id,
          quantity: this.quantity,
        })
        .then(() => {
          this.added = true;
          this.addProductLoading = false;
        });
    } else {
      this.$store
        .dispatch("product/setLazyPostId", this.productDetails.post_id)
        .then(() => {
          this.addProductLoading = false;
          this.$router.push("/login");
        });
    }
  }

  goToShoppingCart() {
    this.$router.push("/shoppingCart");
  }

  get productDetails() {
    if (this.$store.getters["product/getProductDetail"].details === undefined) {
      return {
        product_name: "",
        product_id: 0,
        product_long: 0,
        product_height: 0,
        product_width: 0,
        product_photo: "",
        product_description: "",
        provider_name: "",
        provider_id: 0,
        product_provider_price: 0,
        product_provider_description: "",
        product_provider_available_quantity: 0,
        offer_id: 0,
        offer_rate: "",
        avg_qualification_stars: 0,
        category_id: 0,
        post_id: 0,
      };
    } else {
      return this.$store.getters["product/getProductDetail"].details[0];
    }
  }

  get qualifications() {
    if (
      this.$store.getters["product/getProductDetail"].qualifications ===
      undefined
    ) {
      return {};
    } else {
      return this.$store.getters["product/getProductDetail"].qualifications;
    }
  }

  @Watch("translator")
  translate() {
    this.translator.forEach((term: any) => {
      switch (term.termName) {
        case "availableQuantity": {
          this.availableQuantity = term.termTranslation;
          break;
        }
        case "productLong": {
          this.productLong = term.termTranslation;
          break;
        }
        case "productW": {
          this.productW = term.termTranslation;
          break;
        }
        case "productH": {
          this.productH = term.termTranslation;
          break;
        }
        case "detailQualification": {
          this.detailQualification = term.termTranslation;
          break;
        }
        case "detailOpinions": {
          this.detailOpinions = term.termTranslation;
          break;
        }
        case "addToCart": {
          this.addToCart = term.termTranslation;
          break;
        }
        case "productQ": {
          this.productQ = term.termTranslation;
          break;
        }
        case "seeSC": {
          this.seeSC = term.termTranslation;
          break;
        }
        case "chipProviderDetail": {
          this.chipProviderDetail = term.termTranslation;
          break;
        }
        case "chipOffer1": {
          this.chipOffer1 = term.termTranslation;
          break;
        }
        case "chipOffer2": {
          this.chipOffer2 = term.termTranslation;
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

<style lang="scss">
.discountAmout {
  text-decoration: line-through;
}

.preview {
  border: 1px solid gray;
  cursor: pointer;
}

.selectedPreview {
  border: 1px solid #536dfe;
}

.paths {
  cursor: pointer;
}

.paths:hover {
  text-decoration: underline;
}
</style>
