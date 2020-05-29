import Vue from "vue";
import categoryService from "../../services/categoryService";

function getFKID(id: number, categories: any[]) {
  let FID = -1;
  for (let index = 0; index < categories.length; index++) {
    if (id == categories[index].category_id) {
      FID = categories[index].fk_category_id;
    }

    if (getFKID(id, categories[index].category_child) !== -1 && FID == -1) {
      FID = getFKID(id, categories[index].category_child);
    }
  }
  return FID;
}

function getFKPaths(id: number, categories: any[]) {
  let fk = id;
  const paths = [];

  paths.push(fk);

  for (let index = 0; fk !== null; index++) {
    fk = getFKID(fk, categories);
    if (fk !== null) {
      paths.push(fk);
    }
  }

  return paths;
}

function getPathInfoID(id: number, categories: any[]) {
  let pathInfo: any = null;
  for (let index = 0; index < categories.length; index++) {
    if (id == categories[index].category_id) {
      pathInfo = categories[index];
    }

    if (
      getPathInfoID(id, categories[index].category_child) !== null &&
      pathInfo == null
    ) {
      pathInfo = getPathInfoID(id, categories[index].category_child);
    }
  }
  return pathInfo;
}

function getChildCategories(id: number, categories: any[]) {
  let childCategories: any = [];
  for (let index = 0; index < categories.length; index++) {
    if (id == categories[index].category_id) {
      childCategories = categories[index].category_child;
      index = categories.length;
    } else {
      childCategories = getChildCategories(
        id,
        categories[index].category_child
      );
      if (childCategories.length > 0) {
        index = categories.length;
      }
    }
  }
  return childCategories;
}

function getFinalPaths(id: number, categories: any[]) {
  const fkPaths = getFKPaths(id, categories).reverse();
  const finalPaths: any[] = [];

  for (let index = 0; index < fkPaths.length; index++) {
    const data = getPathInfoID(fkPaths[index], categories);
    finalPaths.push({
      categoryName: `${data.category_name} ${
        fkPaths.length - index == 1 ? "" : ">"
      }`,
      categoryId: fkPaths[index],
      categoryChild: data.category_child,
    });
  }
  return finalPaths;
}

export default {
  namespaced: true,
  // -----------------------------------------------------------------
  state: {
    // Aqui van los atributos
    categories: [],
    actualPath: [],
    childCategories: [],
  },
  // -----------------------------------------------------------------
  getters: {
    // getters and computed props
    getCategories: (state: any) => state.categories,
    getActualPath: (state: any) => state.actualPath,
    getChildCategories: (state: any) => state.childCategories,
  },
  // -----------------------------------------------------------------
  mutations: {
    // Aqui se setean los atributos del state
    setCategories(state: any, categories: []) {
      Vue.set(state, "categories", categories);
    },
    setActualPath(state: any, actualPath: []) {
      Vue.set(state, "actualPath", actualPath);
    },
    setChildCategories(state: any, childCategories: []) {
      Vue.set(state, "childCategories", childCategories);
    },
  },
  // -----------------------------------------------------------------
  actions: {
    // create: (context, bankData) => {
    //   // stuff to create a new bank on the backend : CRUD CREATE ACTION
    // },
    getCategories: async (context: any) => {
      await categoryService.getCategories().then((response: any) => {
        context.commit("setCategories", response.data.categories);
      });
    },
    setActualPath: (context: any, payload: any) => {
      if (payload.clear) {
        context.commit("setActualPath", []);
      } else {
        const paths = getFinalPaths(payload.categoryId, payload.categories);
        context.commit("setActualPath", paths);
      }
    },
    getChildCategories: async (context: any, payload: any) => {
      const childCategories = getChildCategories(
        payload.categoryId,
        payload.categories
      );
      context.commit("setChildCategories", childCategories);
    },
    // update: (context, bankData) => {
    //   // stuff to update bank data to the backend : CRUD UPDATE ACTION
    // },
    // delete: context => {
    //   // stuff to erase bank on the backend : CRUD DELETE ACTION
    // },
  },
};
