import Vue from "vue";
import categoryService from "../../services/categoryService";

function getFKID(id: number, categories: any[]){
  let FID = -1;
  for (let index = 0; index < categories.length; index++) {
    if (id == categories[index].category_id) {
      FID = categories[index].fk_category_id;
    }

    if(getFKID(id, categories[index].category_child) !== -1 && FID == -1){
      FID = getFKID(id, categories[index].category_child);
    }      
  }
  return FID;
}

function getFKPaths(id: number, categories: any[]){
  let fk = id;
  const paths = [];

  paths.push(fk);
  
  for (let index = 0; fk !== null; index++) {
    fk = getFKID(fk, categories);
    if(fk !== null){
      paths.push(fk);
    }      
  }

  return paths;
}

function getPathNameID(id: number, categories: any[]){
  let namePath = "";
  for (let index = 0; index < categories.length; index++) {
    if (id == categories[index].category_id) {
      namePath = categories[index].category_name;
    }

    if(getPathNameID(id, categories[index].category_child) !== ""  && namePath == ""){
      namePath = getPathNameID(id, categories[index].category_child);
    }      
  }
  return namePath;
}

function getFinalPaths(id: number, categories: any[]){
  const fkPaths = getFKPaths(id, categories).reverse();;
  const finalPaths: any[] = [];
  
  for (let index = 0; index < fkPaths.length; index++) {
    finalPaths.push({
      categoryName: `${getPathNameID(fkPaths[index], categories)} ${fkPaths.length-index == 1 ? "":">"}`,
      categoryId: fkPaths[index]
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
  },
  // -----------------------------------------------------------------
  getters: {
    // getters and computed props
    getCategories: (state: any) => state.categories,
    getActualPath: (state: any) => state.actualPath,
  },
  // -----------------------------------------------------------------
  mutations: {
    // Aqui se setean los atributos del state
    setCategories(state: {}, categories: []) {
      Vue.set(state, "categories", categories);
    },
    setActualPath(state: {}, actualPath: []) {
      Vue.set(state, "actualPath", actualPath);
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
      const paths = getFinalPaths(payload.categoryId, payload.categories);
      context.commit("setActualPath", paths);
    },
    // update: (context, bankData) => {
    //   // stuff to update bank data to the backend : CRUD UPDATE ACTION
    // },
    // delete: context => {
    //   // stuff to erase bank on the backend : CRUD DELETE ACTION
    // },
  },
};
