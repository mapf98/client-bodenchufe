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
  },
  // -----------------------------------------------------------------
  getters: {
    // getters and computed props
    getProducts: (state: any) => state.products,
    getProductsPath: (state: any) => state.productsPath,
    getProductDetail: (state: any) => state.productDetail,
  },
  // -----------------------------------------------------------------
  mutations: {
    // Aqui se setean los atributos del state
    setProducts(state: {}, products: []) {
      Vue.set(state, "products", products);
    },
    setProductsPath(state: {}, path: {}) {
      Vue.set(state, "productsPath", path);
    },
    setProductDetail(state: {}, productDetail: {}) {
      Vue.set(state, "productDetail", productDetail);
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
    // update: (context, bankData) => {
    //   // stuff to update bank data to the backend : CRUD UPDATE ACTION
    // },
    // delete: context => {
    //   // stuff to erase bank on the backend : CRUD DELETE ACTION
    // },
  },
};
