import MallApi from '../../api/mobile/mall';

export default {
  namespaced: true,
  actions: {
    async getMallHotModule({commit}) {
      await MallApi().getMallHotModule({modules: 'hot,new'}).then(res => {
        if (res.data) commit('MALL_HOT_MODULE', res.data);
      });
    },
    async getMallChannel({commit}) {
      await MallApi().getMallChannel({}).then(res => {
        if (res.data) commit('MALL_CHANNEL', res.data);
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
    MALL_HOT_MODULE: (state, res) => {
      state.mall_hot = res;
    },
    MALL_CHANNEL: (state, res) => {
      state.mall_channel = res;
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
    mall_hot: [], // ETC 热门商品
    mall_channel: [], // ETC 商城首页频道
    module_list: [], // ETC 人工榜单
    recommend_list: [], // ETC 推荐列表
    pageInfo: {
      current_page: -1, // ETC 当前页
      page_total: 0 // ETC 总页数
    },
    loadInfo: {
      loading: false, // ETC 是否loading
      noMore: false // ETC 是否到底
    }
  })
};
