import MallApi from '../../api/mobile/mall';
export default {
  namespaced: true,
  actions: {
    async getAutoNewProduct({commit, state}, data) {
      if (state.loadInfo.loading && state.loadInfo.noMore) return;
      await MallApi().getAutoNewProduct({type: data.id, page: ++state.pageInfo.current_page}).then(res => {
        if (res.data) commit('PRODUCT_LIST', res.data);
      });
    }
  },
  mutations: {
    PRODUCT_LIST: (state, res) => {
      state.pageInfo.page_total = res.data.last_page;
      state.title = res.title;
      state.product_list = state.product_list.concat(res.data.data);
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
    },
    title: '',
    textarea: '' // ETC 富文本
  })
};
