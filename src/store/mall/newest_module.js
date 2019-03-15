import MallApi from '../../api/mobile/mall';

export default {
  namespaced: true,
  actions: {
    async getNewestModule({commit, state}, type) {
      await MallApi().getAutoModuleDetail({type, page: ++state.pageInfo.current_page}).then(res => {
        if (res.data) commit('NEWEST_MODULE', res.data);
      });
    }
  },
  mutations: {
    CHANGE_LOADING: (state, res) => {
      state.loadInfo.loading = res;
    },
    NEWEST_MODULE: (state, res) => {
      state.pageInfo.page_total = res.data.last_page;
      state.newest_module = state.newest_module.concat(res.data.data);

      // 触底判断
      state.loadInfo.loading = false;
      if (state.pageInfo.current_page >= state.pageInfo.page_total || !state.newest_module.length) {
        state.loadInfo.loading = true;
        state.loadInfo.noMore = true;
      }
    }
  },
  state: () => ({
    newest_module: [], // ETC 热门榜单
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
