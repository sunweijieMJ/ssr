import MallApi from '../../api/mobile/mall';

export default {
  namespaced: true,
  actions: {
    async getDetail_with_basic({commit}, id) {
      await MallApi().getProductDetail({product_id: id, with_basic: 1, with_specs: 1, with_params: 1, with_dynamics: 1, with_joyful: 1, with_service: 1, with_options: 1, with_option_skus: 1, with_option_stocks: 1}).then(res => {
        if (res.status) commit('MERGE_INFO', res.data);
        else commit('SOLD_OUT', true);
      });
    },
    async getDetailRecommend({commit}, id) {
      await MallApi().getDetailRecommend(id).then(res => {
        if (res.status && res.data) commit('RECOMMEND_GOODS', res.data);
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
    RECOMMEND_GOODS: (state, res) => {
      state.recommend_goods = res;
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
    recommend_goods: [], // ETC 推荐商品
    sold_out: false, // ETC 商品是否下架
    cut_out: false, // ETC 查看参数
    sku_popup: { // ETC sku弹框
      status: false
    }
  })
};
