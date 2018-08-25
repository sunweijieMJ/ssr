import productApi from '../../api/product';

export default {
  namespaced: true,
  state: () => ({
    productabc: {}
  }),
  actions: {
    async getProduct({commit}, productId) {
      await productApi.getProductDescriptionById(productId).then((res) => {
        commit('UPDATE_PRODUCT_DESCRIPTION', res.data);
      });
    }
  },
  mutations: {
    UPDATE_PRODUCT_DESCRIPTION: (state, data) => {
      state.productabc = {...data};
      console.log(state.productabc.description);
    }
  },
  getters: {
    getProduct: state => state.productabc
  }

};
