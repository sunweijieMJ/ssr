import MallApi from '../../api/mobile/mall';

export default {
  namespaced: true,
  actions: {
    async getCategoryList({commit}) {
      await MallApi().getCategoryList({category_id: 0}).then(res => {
        if (res.data) commit('CATEGRAY_LIST', res.data);
      });
    },
    async getHotModule({commit, state}) {
      await MallApi().getModuleRecommend({page: ++state.pageInfo.current_page}).then(res => {
        if (res.data) commit('HOT_MODULE', res.data);
      });
    }
  },
  mutations: {
    CATEGRAY_LIST: (state, res) => {
      state.categray_list = res;
    },
    CHANGE_LOADING: (state, res) => {
      state.loadInfo.loading = res;
    },
    HOT_MODULE: (state, res) => {
      state.pageInfo.page_total = res.last_page;
      state.hot_module = state.hot_module.concat(res.data);

      // 触底判断
      state.loadInfo.loading = false;
      if (state.pageInfo.current_page >= state.pageInfo.page_total || !state.hot_module.length) {
        state.loadInfo.loading = true;
        state.loadInfo.noMore = true;
      }
    }
  },
  state: () => ({
    categray_list: [],
    hot_module: [], // ETC 热门榜单
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
