import MallApi from '../../api/mobile/mall';

export default {
  namespaced: true,
  actions: {
    async getMallList({commit}) {
      await MallApi().getMallList({}).then(res => {
        if (res.status) commit('MALL_LIST', res.data);
      });
    },
    async getMallChannel({commit}) {
      await MallApi().getMallChannel({}).then(res => {
        if (res.data) commit('MALL_CHANNEL', res.data);
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
    async getModuleRecommend({commit, state}) {
      if (state.loadInfo.loading && state.loadInfo.noMore) return;
      commit('CHANGE_LOADING', true);
      await MallApi().getModuleRecommend({page: ++state.pageInfo.current_page}).then(res => {
        if (res.status) commit('RECOMMEND_LIST', res.data);
      });
    }
  },
  mutations: {
    MALL_LIST: (state, res) => {
      state.mall_list = res;
    },
    MALL_CHANNEL: (state, res) => {
      state.mall_channel = res;
    },
    CATEGORY_LIST: (state, res) => {
      state.category = res;
    },
    MANUAL_MODULE_LIST: (state, res) => {
      state.module_list = res;
    },
    CHANGE_LOADING: (state, res) => {
      state.loadInfo.loading = res;
    },
    RECOMMEND_LIST: (state, res) => {
      state.pageInfo.page_total = res.last_page;
      state.recommend_list = state.recommend_list.concat(res.data);

      // 触底判断
      state.loadInfo.loading = false;
      if (state.pageInfo.current_page >= state.pageInfo.page_total || !state.recommend_list.length) {
        state.loadInfo.loading = true;
        state.loadInfo.noMore = true;
      }
    }
  },
  state: () => ({
    mall_list: [], // ETC 热门商品
    mall_channel: [], // ETC 商城首页频道
    category: [], // ETC 类目列表
    module_list: [], // ETC 人工榜单
    recommend_list: [], // ETC 推荐列表
    pageInfo: {
      current_page: 0, // ETC 当前页
      page_total: 0 // ETC 总页数
    },
    loadInfo: {
      loading: false, // ETC 是否loading
      noMore: false // ETC 是否到底
    }
  })
};
