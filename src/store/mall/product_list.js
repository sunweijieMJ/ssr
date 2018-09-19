import MallApi from '../../api/mobile/mall';

export default {
  namespaced: true,
  actions: {
    async getProductList({commit, state}) {
      if (state.loadInfo.loading && state.loadInfo.noMore) return;
      commit('CHANGE_LOADING', true);
      await MallApi().getProList({page: ++state.pageInfo.current_page, with_dynamics: 0, with_option_skus: 0, with_option_stocks: 1, with_options: 1, with_params: 0, with_specs: 0}).then(res => {
        if (res.status && res.data) commit('PRODUCT_LIST', res.data);
      });
    }
  },
  mutations: {
    PRODUCT_LIST: (state, res) => {
      state.pageInfo.page_total = res.last_page;
      state.list = state.list.concat(res.data);
      // page: ++state.pageInfo.current_page, with_dynamics: 0, with_option_skus: 0, with_option_stocks: 1, with_options: 1, with_params: 0, with_specs: 0
      // http://api.shoptest.dev.weiheinc.com/mall/product/list?__platform=app&app=i-lanehub&build=599&device=iPhone&os=iOS11.3&page=1&page_size=16&sign=46087e9456d5e9fc2bcde98f46d7c457&udid=6256f32be9d2f999fca9d4c9c4c9f5a44ab78d07&version=2.0&with_dynamics=0&with_option_skus=0&with_option_stocks=1&with_options=1&with_params=0&with_specs=0
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
