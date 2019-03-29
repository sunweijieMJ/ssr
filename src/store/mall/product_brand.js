import MallApi from '../../api/mobile/mall';

export default {
  namespaced: true,
  actions: {
    async getProductBrand({commit, state}, product_id) {
      if (state.loadInfo.loading && state.loadInfo.noMore) return;
      commit('CHANGE_LOADING', true);
      await MallApi().getProductBrand({product_id, page: ++state.pageInfo.current_page}).then(res => {
        if (res.status) commit('BRAND_LIST', res.data);
      });
    }
  },
  mutations: {
    CHANGE_LOADING: (state, res) => {
      state.loadInfo.loading = res;
    },
    BRAND_LIST: (state, res) => {
      state.pageInfo.current_page = res.current_page;
      state.pageInfo.page_total = res.last_page || 0;
      state.brand_list = state.brand_list.concat(res.data);

      // 触底判断
      state.loadInfo.loading = false;
      if (state.pageInfo.current_page >= state.pageInfo.page_total || !state.brand_list.length) {
        state.loadInfo.loading = true;
        state.loadInfo.noMore = true;
      }
    }
  },
  state: () => ({
    brand_list: [], // ETC 活动列表
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
