import MallApi from '../../api/mobile/mall';

export default {
  namespaced: true,
  actions: {
    async getProductDetail({commit}, id) {
      await MallApi().getProductDetail({product_id: id}).then(res => {
        if (res.status && res.data) commit('PRODUCT_DETAIL', res.data);
      });
    },
    async getProductDynamic({commit, state}, id) {
      if (state.loadInfo.loading && state.loadInfo.noMore) return;
      commit('CHANGE_LOADING', true);
      await MallApi().getProductDynamic(id, ++state.pageInfo.current_page).then(res => {
        if (res.status) commit('PRODUCT_DYNAMIC', res.data);
      });
    }
  },
  mutations: {
    PRODUCT_DETAIL: (state, res) => {
      state.product_info = res;
    },
    CHANGE_LOADING: (state, res) => {
      state.loadInfo.loading = res;
    },
    PRODUCT_DYNAMIC: (state, res) => {
      if (res === []) {
        state.pageInfo.page_total = 1;
        state.buyer_show_list = [];
      } else {
        state.pageInfo.page_total = res.last_page;
        state.buyer_show_list = state.buyer_show_list.concat(res.data);
      }

      // 触底判断
      state.loadInfo.loading = false;
      if (state.pageInfo.current_page >= state.pageInfo.page_total || !state.buyer_show_list.length) {
        state.loadInfo.loading = true;
        state.loadInfo.noMore = true;
      }
    }
  },
  state: () => ({
    product_info: null, // ETC 商品信息
    buyer_show_list: [], // ETC 买家秀动态
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
