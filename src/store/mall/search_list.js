import MallApi from '../../api/mobile/mall';

export default {
  namespaced: true,
  actions: {
    async getProductList({commit, state}, data) {
      if (state.loadInfo.loading && state.loadInfo.noMore) return;
      commit('CHANGE_LOADING', true);
      await MallApi().getProList({category_id: data.id ? data.id : -1, keyword: data.key ? data.key : '', page: ++state.pageInfo.current_page, with_dynamics: 0, with_option_skus: 0, with_option_stocks: 1, with_options: 1, with_params: 0, with_specs: 0}).then(res => {
        if (res.data) commit('PRODUCT_LIST', res.data);
      });
    },
    async getProductList2({commit}, data) {
      await MallApi().getProList({keyword: data.key, category_id: data.id ? data.id : 0, page: 1, with_dynamics: 0, with_option_skus: 0, with_option_stocks: 1, with_options: 1, with_params: 0, with_specs: 0}).then(res => {
        if (res.data) commit('PRODUCT_LIST2', res.data);
      });
    },
    async getHot({commit}) {
      await MallApi().getHotList().then(res => {
        if (res.data) commit('HoT_LIST', res.data);
      });
    },
    async getHistory({commit}) {
      await MallApi().getHistoryList().then(res => {
        if (res.data) commit('HISTORY_LIST', res.data);
      });
    },
    async getThinkList({commit}, keys) {
      await MallApi().getThinkList({keyword: keys}).then(res => {
        if (res.data) commit('THINK_LIST', res.data);
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
      state.list = [];
      state.list = res.data;
      state.pageInfo.current_page = 1;
      state.pageInfo.page_total = res.last_page;

      state.loadInfo.loading = false;
      if (state.pageInfo.current_page >= state.pageInfo.page_total || !state.list.length) {
        state.loadInfo.loading = true;
        state.loadInfo.noMore = true;
      }
    },
    CHANGE_LOADING: (state, res) => {
      state.loadInfo.loading = res;
    },
    HoT_LIST: (state, res) => {
      state.hotlist = res;
    },
    HISTORY_LIST: (state, res) => {
      state.history = res;
    },
    THINK_LIST: (state, res) => {
      state.thinklist = res;
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
    },
    hotlist: '',
    history: '',
    thinklist: ''
  })
};
