import Vue from "vue";
import productService from "../../services/productService";

async function getAllProducts(categoryId: number, child: any) {
  const totalProducts: any = [];
  let childProducts: any = [];
  let products: any = [];

  products = await (await productService.getProductByCategory(categoryId)).data
    .products;
  products.forEach((product: any) => {
    totalProducts.push(product);
  });

  for (let index = 0; index < child.length; index++) {
    childProducts = await getAllProducts(
      child[index].category_id,
      child[index].category_child
    );
    childProducts.forEach((product: any) => {
      totalProducts.push(product);
    });
  }

  return totalProducts;
}

export default {
  namespaced: true,
  // -----------------------------------------------------------------
  state: {
    // Aqui van los atributos
    products: [],
    productsPath: {},
    productDetail: {},
    productsByKeyword: [],
    lazyPost: 0,
  },
  // -----------------------------------------------------------------
  getters: {
    // getters and computed props
    getProducts: (state: any) => state.products,
    getProductsPath: (state: any) => state.productsPath,
    getProductDetail: (state: any) => state.productDetail,
    getProductByKeyword: (state: any) => state.productsByKeyword,
    getLazyPostId: (state: any) => state.lazyPost,
  },
  // -----------------------------------------------------------------
  mutations: {
    // Aqui se setean los atributos del state
    setProducts(state: any, products: []) {
      Vue.set(state, "products", products);
    },
    setProductsPath(state: any, path: any) {
      Vue.set(state, "productsPath", path);
    },
    setProductDetail(state: any, productDetail: any) {
      Vue.set(state, "productDetail", productDetail);
    },
    setProductByKeyword(state: any, productsByKeyword: any) {
      Vue.set(state, "productsByKeyword", productsByKeyword);
    },
    setLazyPostId(state: any, lazyPost: any) {
      Vue.set(state, "lazyPost", lazyPost);
    },
  },
  // -----------------------------------------------------------------
  actions: {
    // create: (context, bankData) => {
    //   // stuff to create a new bank on the backend : CRUD CREATE ACTION
    // },
    getProductByCategory: async (context: any, payload: any) => {
      const allProducts = await getAllProducts(
        payload.categoryId,
        payload.childCategories
      );
      context.commit("setProducts", allProducts);
      context.commit("setProductsPath", {
        pathName: payload.name,
        type: "category",
      });
    },
    getProductByProvider: async (context: any, payload: any) => {
      await productService
        .getProductByProvider(payload.providerId)
        .then((response: any) => {
          context.commit("setProducts", response.data.products);
          context.commit("setProductsPath", {
            pathName: payload.name,
            type: "provider",
          });
        });
    },
    getProductByOffer: async (context: any, payload: any) => {
      await productService
        .getProductByOffer(payload.offerId)
        .then((response: any) => {
          context.commit("setProducts", response.data.products);
          context.commit("setProductsPath", {
            pathName: payload.name,
            type: "offer",
          });
        });
    },
    getProductDetail: async (context: any, payload: any) => {
      await productService
        .getProductDetail(payload.postId)
        .then((response: any) => {
          const productDetail = {
            details: response.data.product,
            qualifications: response.data.qualifications,
          };
          context.commit("setProductDetail", productDetail);
        });
    },
    getProductByKeyword: async (context: any, payload: any) => {
      if (payload.keyword !== "") {
        await productService
          .getProductByKeyword(payload.keyword)
          .then((response: any) => {
            context.commit("setProductByKeyword", response.data);
          });
      }
    },
    setLazyPostId: async (context: any, payload: any) => {
      context.commit("setLazyPostId", payload);
    },
    checkPostId: async (context: any, payload: any) => {
      let exists = false;
      await productService.checkPostId(payload).then((response: any) => {
        exists = response.data.exists;
      });
      return exists;
    },
    // update: (context, bankData) => {
    //   // stuff to update bank data to the backend : CRUD UPDATE ACTION
    // },
    // delete: context => {
    //   // stuff to erase bank on the backend : CRUD DELETE ACTION
    // },
  },
};
