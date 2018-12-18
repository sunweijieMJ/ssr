import EmbedApi from '../../api/app/embed.js';
import imageSize from '../../utils/filters/imageSize.js';

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
      let pattern = /src=['"]?([^'"]*)['"]?/ig;
      data.description = data.description.replace(pattern, ($1, $2) => {
        return `src="${imageSize($2, 'minSide')}"`;
      });
      state.description = data;
    }
  },
  state: () => ({
    description: {}
  })
};
