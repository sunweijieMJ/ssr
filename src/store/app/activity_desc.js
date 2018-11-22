import EmbedApi from '../../api/app/index.js';

export default {
  namespaced: true,
  actions: {
    async getProduct({commit}, productId) {
      await EmbedApi().getProductDescriptionById(productId).then((res) => {
        commit('UPDATE_PRODUCT_DESCRIPTION', res.data);
      });
    }
  },
  mutations: {
    UPDATE_PRODUCT_DESCRIPTION: (state, data) => {
      state.productabc = {...data};
    }
  },
  state: () => ({
    productabc: {}
  })
};
