import MallApi from '../../api/mobile/mall';

export default {
  namespaced: true,
  actions: {
    async getProductParams({commit}, id) {
      await MallApi().getProductDetail({product_id: id}).then(res => {
        if (res.status && res.data) commit('PRODUCT_DETAIL', res.data);
      });
    }
  },
  mutations: {
    PRODUCT_DETAIL: (state, res) => {
      state.product_info = res;
    }
  },
  state: () => ({
    product_info: null // ETC 商品详情
  })
};

