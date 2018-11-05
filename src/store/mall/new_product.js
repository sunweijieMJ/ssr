import MallApi from '../../api/mobile/mall';
export default {
  namespaced: true,
  actions: {
    async getNewProduct({commit, state}, data) {
      await MallApi().getNewProduct({id: data.id, page: ++state.pageInfo.current_page}).then(res => {
        if (res.data) commit('PRODUCT_LIST', res.data.data);
      });
    }
  },
  mutations: {
    PRODUCT_LIST: (state, res) => {
      state.pageInfo.page_total = res.last_page;
      state.product_list = state.product_list.concat(res.data);
      // 触底判断
      state.loadInfo.loading = false;
      if (state.pageInfo.current_page >= state.pageInfo.page_total || !state.product_list.length) {
        state.loadInfo.loading = true;
        state.loadInfo.noMore = true;
      }
    }
  },
  state: () => ({
    pageInfo: {
      current_page: 0, // ETC 当前页
      page_total: 0 // ETC 总页数
    },
    product_list: [], // ETC 店铺列表
    loadInfo: {
      loading: false, // ETC 是否loading
      noMore: false // ETC 是否到底
    }
  })
};
