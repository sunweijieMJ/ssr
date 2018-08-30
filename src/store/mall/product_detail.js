import MallApi from '../../api/mobile/mall';

export default {
  namespaced: true,
  actions: {
    async getProductDetail({commit}, id) {
      await MallApi().getProductDetail({product_id: id}).then(res => {
        if (res.status && res.data) commit('PRODUCT_DETAIL', res.data);
        else commit('SOLD_OUT', true);
      });
    },
    changeSkuPopup: ({commit}, data) => {
      commit('SKU_POPUP', data);
    }
  },
  mutations: {
    PRODUCT_DETAIL: (state, res) => {
      state.product_info = res;
    },
    SOLD_OUT: (state, res) => {
      state.sold_out = res;
    },
    SKU_POPUP: (state, data) => {
      state.sku_popup = data;
    }
  },
  state: () => ({
    product_info: null, // ETC 商品详情
    sold_out: false, // ETC 商品是否下架
    sku_popup: { // ETC sku弹框
      status: false
    }
  })
};
