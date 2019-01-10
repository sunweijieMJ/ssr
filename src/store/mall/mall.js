import MallApi from '../../api/mobile/mall';

export default {
  namespaced: true,
  actions: {
    async getHotGoods({commit}) {
      await MallApi().getDetailRecommend(349).then(res => {
        if (res.status) commit('HOT_GOODS', res.data);
      });
    },
    async getMallList({commit}) {
      await MallApi().getMallList({}).then(res => {
        if (res.status) commit('MALL_LIST', res.data);
      });
    },
    async getManualModuleList({commit}) {
      await MallApi().getManualModuleList({}).then(res => {
        if (res.status) commit('MANUAL_MODULE_LIST', res.data);
      });
    }

  },
  mutations: {
    HOT_GOODS: (state, res) => {
      state.hot_goods = res;
    },
    MALL_LIST: (state, res) => {
      state.mall_list = res;
    },
    MANUAL_MODULE_LIST: (state, res) => {
      state.module_list = res;
    }
  },
  state: () => ({
    hot_goods: [], // ETC 热门商品
    mall_list: [], // ETC 热门商品
    module_list: [], // ETC 人工榜单
    category: ['家具', '家具', '家具', '家具', '家具', '家具', '家具', '家具']
  })
};
