import productApi from '../../api/product';
const pApi = new productApi();

export default {
  namespaced: true,
  state: () => ({
    productabc: {}
  }),
  actions: {
    async getProduct({commit}, productId) {
      await pApi.getProductDescriptionById(productId).then((res) => {
        commit('UPDATE_PRODUCT_DESCRIPTION', res.data);
      });
    }
  },
  mutations: {
    UPDATE_PRODUCT_DESCRIPTION: (state, data) => {
      state.productabc = {...data};
    }
  },
  getters: {
    getProduct: state => state.productabc
  }

};
