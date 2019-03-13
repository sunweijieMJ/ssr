import MallApi from '../../api/mobile/mall';

export default {
  namespaced: true,
  actions: {
    async getDiscountModule({commit, state}) {
      await MallApi().getModuleRecommend({page: ++state.pageInfo.current_page}).then(res => {
        if (res.data) commit('DISCOUNT_MODULE', res.data);
      });
    }
  },
  mutations: {
    CHANGE_LOADING: (state, res) => {
      state.loadInfo.loading = res;
    },
    DISCOUNT_MODULE: (state, res) => {
      state.pageInfo.page_total = res.last_page;
      state.discount_module = state.discount_module.concat(res.data);

      // 触底判断
      state.loadInfo.loading = false;
      if (state.pageInfo.current_page >= state.pageInfo.page_total || !state.discount_module.length) {
        state.loadInfo.loading = true;
        state.loadInfo.noMore = true;
      }
    }
  },
  state: () => ({
    discount_module: [], // ETC 折扣榜单
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
