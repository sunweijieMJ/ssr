import MallApi from '../../api/mobile/mall';

export default {
  namespaced: true,
  actions: {
    async getHotModule({commit, state}, type) {
      await MallApi().getAutoModuleDetail({type, page: ++state.pageInfo.current_page, with_head_buyshow: 1}).then(res => {
        if (res.data) commit('HOT_MODULE', res.data);
      });
    },
    resetData({commit}) {
      commit('RESET_DATA');
    }
  },
  mutations: {
    CHANGE_LOADING: (state, res) => {
      state.loadInfo.loading = res;
    },
    HOT_MODULE: (state, res) => {
      state.pageInfo.page_total = res.data.last_page;
      state.hot_module = state.hot_module.concat(res.data.data);

      // 触底判断
      state.loadInfo.loading = false;
      if (state.pageInfo.current_page >= state.pageInfo.page_total || !state.hot_module.length) {
        state.loadInfo.loading = true;
        state.loadInfo.noMore = true;
      }
    },
    RESET_DATA: (state) => {
      state.hot_module = [];
      state.pageInfo = {
        current_page: 0,
        page_total: 0
      };
      state.loadInfo = {
        loading: false,
        noMore: false
      };
    }
  },
  state: () => ({
    hot_module: [], // ETC 热门榜单
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
