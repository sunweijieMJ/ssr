import MallApi from '../../api/mobile/mall';

export default {
  namespaced: true,
  actions: {
    async getProductList({commit, state}) {
      if (state.loadInfo.loading && state.loadInfo.noMore) return;
      commit('CHANGE_LOADING', true);
      await MallApi().getProList({page: ++state.pageInfo.current_page, with_specs: 1, with_options: 1}).then(res => {
        if (res.status && res.data) commit('PRODUCT_LIST', res.data);
      });
    }
  },
  mutations: {
    PRODUCT_LIST: (state, res) => {
      console.log(res);
      state.pageInfo.page_total = res.last_page;
      state.list = state.list.concat(res.data);

      // 触底判断
      state.loadInfo.loading = false;
      if (state.pageInfo.current_page >= state.pageInfo.page_total || !state.list.length) {
        state.loadInfo.loading = true;
        state.loadInfo.noMore = true;
      }
    },
    CHANGE_LOADING: (state, res) => {
      state.loadInfo.loading = res;
    }
  },
  state: () => ({
    list: [],
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
