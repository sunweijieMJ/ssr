import EmbedApi from '../../api/app/index.js';

export default {
  namespaced: true,
  actions: {
    async getProductDesc({commit}, productId) {
      await EmbedApi().getProductDesc(productId).then((res) => {
        commit('PRODUCT_DESCRIPTION', res.data);
      });
    }
  },
  mutations: {
    PRODUCT_DESCRIPTION: (state, data) => {
      state.description = data;
    }
  },
  state: () => ({
    description: {}
  })
};
