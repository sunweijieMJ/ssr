import MallApi from '../../api/mobile/mall';

export default {
  namespaced: true,
  actions: {
    async getDetail_with_specs({commit}, id) {
      await MallApi().getProductDetail({product_id: id, with_specs: 1}).then(res => {
        if (res.status && res.data) commit('MERGE_INFO', res.data);
        else commit('SOLD_OUT', true);
      });
    },
    async getDetail_with_params({commit}, id) {
      await MallApi().getProductDetail({product_id: id, with_params: 1}).then(res => {
        if (res.status && res.data) commit('MERGE_INFO', res.data);
      });
    },
    async getDetail_with_options({commit}, id) {
      await MallApi().getProductDetail({product_id: id, with_options: 1, with_option_skus: 1, with_option_stocks: 1}).then(res => {
        if (res.status && res.data) commit('MERGE_INFO', res.data);
      });
    },
    async getDetail_with_dynamics({commit}, id) {
      await MallApi().getProductDetail({product_id: id, with_dynamics: 1}).then(res => {
        if (res.status && res.data) commit('MERGE_INFO', res.data);
      });
    },
    changeSkuPopup: ({commit}, data) => {
      commit('SKU_POPUP', data);
    },
    cutToParams: ({commit}, data) => {
      commit('CUT_TO_PARAMS', data);
    }
  },
  mutations: {
    MERGE_INFO: (state, res) => {
      Object.assign(state.product_info, res);
    },
    SOLD_OUT: (state, res) => {
      state.sold_out = res;
    },
    SKU_POPUP: (state, data) => {
      state.sku_popup = data;
    },
    CUT_TO_PARAMS: (state, data) => {
      state.cut_out = data;
    }
  },
  state: () => ({
    product_info: {}, // ETC 商品详情
    sold_out: false, // ETC 商品是否下架
    cut_out: false, // ETC 查看参数
    sku_popup: { // ETC sku弹框
      status: false
    }
  })
};
