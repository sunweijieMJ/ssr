import MallApi from '../../api/mobile/mall';

export default {
  namespaced: true,
  actions: {
    async getProductList({commit, state}, id) {
      console.log(id);
      console.log(state.loadInfo.noMore);
      if (state.loadInfo.loading && state.loadInfo.noMore) return;
      commit('CHANGE_LOADING', true);
      await MallApi().getProList({category_id: id, page: ++state.pageInfo.current_page, with_dynamics: 0, with_option_skus: 0, with_option_stocks: 1, with_options: 1, with_params: 0, with_specs: 0}).then(res => {
        if (res.data) commit('PRODUCT_LIST', res.data);
      });
    },
    async getProductList2({commit}, id) {
      await MallApi().getProList({category_id: id, page: 1, with_dynamics: 0, with_option_skus: 0, with_option_stocks: 1, with_options: 1, with_params: 0, with_specs: 0}).then(res => {
        if (res.data) commit('PRODUCT_LIST2', res.data);
      });
    },
    async getCategray({commit}) {
      await MallApi().getCategrayList({category_id: 0}).then(res => {
        if (res.data) commit('CATEGRAY_LIST', res.data);
      });
    }
  },
  mutations: {
    PRODUCT_LIST: (state, res) => {
      state.pageInfo.page_total = res.last_page;
      state.list = state.list.concat(res.data);
      // 触底判断
      state.loadInfo.loading = false;
      if (state.pageInfo.current_page >= state.pageInfo.page_total || !state.list.length) {
        state.loadInfo.loading = true;
        state.loadInfo.noMore = true;
      }
    },
    PRODUCT_LIST2: (state, res) => {
      state.list = res.data;
    },
    CHANGE_LOADING: (state, res) => {
      state.loadInfo.loading = res;
    },
    CATEGRAY_LIST: (state, res) => {
      state.categray_list = res;
      console.log(res);
    }
  },
  state: () => ({
    list: [],
    categray_list: '',
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
