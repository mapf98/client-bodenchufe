<template>
  <v-container fluid>
    <v-row class="d-flex justify-center align-center">
      <v-col :cols="detailCols()">
        <v-row class="d-flex justify-center align-center">
          <v-col cols="2">
            <div v-for="preview in productsUrlImages" :key="preview" class="my-1 preview d-flex justify-center" @click="showPhoto(preview)">
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
            <p class="mb-0 title indigo--text my-2">{{productDetails.product_name}}</p>
          </div>
          <v-divider class="mx-12 amber"></v-divider>
          <v-row class="d-flex justify-center align-center mt-8" v-if="productDetails.offer_rate !== null">
            <v-col class="d-flex justify-center align-center">
              <p class="mb-0 mx-2 title discountAmout">{{productDetails.product_provider_price}}$</p>
              <p class="mb-0 title success--text">(-{{productDetails.offer_rate}})</p>
            </v-col>
          </v-row>
          <v-row class="mt-6">
            <v-col class="d-flex justify-center align-center">
              <p class="mb-0 display-1 indigo--text">{{totalCost(productDetails.offer_rate)}}$</p>
            </v-col>
          </v-row>
          <div class="d-flex justify-center align-center mt-8">
            <p class="mb-0 mr-2 title amber--text font-weight-bold">{{avg}}.0</p>
            <v-rating v-model="avg" readonly dense small color="amber" background-color="amber lighten-1"></v-rating>
          </div>
          <p class="mb-0 mt-6 text-center indigo--text font-weight-bold">Available quantity: {{productDetails.product_provider_available_quantity}}</p>
          <v-divider class="indigo mt-3"></v-divider>
          <v-card-actions class="d-flex justify-space-around align-center py-3">
            <v-row>
              <v-col class="d-flex justify-center align-center">
                <v-btn color="amber darken-3" dark>
                  Añadir al carrito
                  <v-icon>
                    mdi-cart-arrow-down
                  </v-icon>
                </v-btn>
              </v-col>
              <v-col>
                <div class="d-flex justify-center align-center">
                  <v-btn icon color="indigo darken-3" @click="incrementQuantity">
                    <v-icon>mdi-cart-plus</v-icon>
                  </v-btn>
                  <p class="mb-0 mx-2">Quantity: {{quantity}}</p>
                  <v-btn icon color="indigo darken-3" @click="decrementQuantity">
                    <v-icon>mdi-cart-minus</v-icon>
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Watch, Prop } from "vue-property-decorator";
import CategoryPath from "../components/CategoryPath.vue";
import { fs } from "../firebase";

@Component({
  components: {
    CategoryPath,
  }
})
export default class ProductDetail extends Vue {
  avg = 0;
  quantity = 1;
  productsUrlImages: any = [];
  productPhoto = this.productDetails.product_photo;

  getProductImages(productId: number) {
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

  showPhoto(photo: string){
    this.productPhoto = photo;
  }

  mounted(){
    this.avg = Math.round(this.productDetails.avg_qualification_stars);
    console.log(this.productsUrlImages);
    console.log(this.productDetails);
  }

  created(){
    this.getProductImages(this.productDetails.product_id);
  }

  incrementQuantity(){
    if(this.quantity < this.productDetails.product_provider_available_quantity){
      this.quantity++;
    }
  }

  decrementQuantity(){
    if(this.quantity > 1){
      this.quantity--;
    }
  }

  detailCols() {
    const { xs, sm } = this.$vuetify.breakpoint;
    return xs || sm ? 12 : 6;
  }

  totalCost(offerRate: string){
    if(offerRate !== null){
      const offer = offerRate.split('%')[0];
      const discount = this.productDetails.product_provider_price * parseInt(offer)/100;
      return this.productDetails.product_provider_price - discount;
    }else{
      return this.productDetails.product_provider_price;
    }
  } 

  get productDetails(){
    return this.$store.getters["product/getProductDetail"].details[0];
  }

  get qualifications(){
    return this.$store.getters["product/getProductDetail"].qualifications;
  }
}
</script>

<style lang="scss">
.discountAmout{
  text-decoration: line-through;
}

.preview{
  border: 1px solid gray;
  cursor: pointer;
}
</style>
