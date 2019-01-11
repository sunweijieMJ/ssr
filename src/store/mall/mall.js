import MallApi from '../../api/mobile/mall';

export default {
  namespaced: true,
  actions: {
    async getMallList({commit}) {
      await MallApi().getMallList({}).then(res => {
        if (res.status) commit('MALL_LIST', res.data);
      });
    },
    async getCategoryList({commit}) {
      await MallApi().getCategoryList({category_id: 0}).then(res => {
        if (res.data) commit('CATEGORY_LIST', res.data);
      });
    },
    async getModuleManualList({commit}) {
      await MallApi().getModuleManualList({}).then(res => {
        if (res.status) commit('MANUAL_MODULE_LIST', res.data);
      });
    },
    async getModuleRecommend({commit}) {
      await MallApi().getModuleRecommend({}).then(res => {
        if (res.status) commit('RECOMMEND_LIST', res.data);
      });
    }
  },
  mutations: {
    MALL_LIST: (state, res) => {
      state.mall_list = res;
    },
    CATEGORY_LIST: (state, res) => {
      state.category = res;
    },
    MANUAL_MODULE_LIST: (state, res) => {
      state.module_list = res;
    },
    RECOMMEND_LIST: (state, res) => {
      state.recommend_list = res;
    }
  },
  state: () => ({
    mall_list: [], // ETC 热门商品
    category: [], // ETC 类目列表
    module_list: [], // ETC 人工榜单
    recommend_list: [] // ETC 推荐列表
  })
};
