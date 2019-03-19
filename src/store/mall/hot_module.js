import MallApi from '../../api/mobile/mall';

export default {
  namespaced: true,
  actions: {
    async getHotModule({commit}) {
      await MallApi().getHotModule({modules: 'hot,new'}).then(res => {
        if (res.data) commit('HOT_MODULE', res.data);
      });
    }
  },
  mutations: {
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
    hot_module: [], // ETC 人工榜单
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
