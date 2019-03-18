import MallApi from '../../api/mobile/mall';

export default {
  namespaced: true,
  actions: {
    async getMallModule({commit, state}, {type, with_head_buyshow}) {
      await MallApi().getAutoModuleDetail({type, with_head_buyshow, page: ++state.pageInfo.current_page}).then(res => {
        if (res.data) commit('MALL_MODULE', res.data);
      });
    },
    resetData({commit}) {
      commit('RESET_DATA');
    }
  },
  mutations: {
    CHANGE_LOADING: (state, res) => {
      state.loadInfo.loading = res;
    },
    MALL_MODULE: (state, res) => {
      state.pageInfo.page_total = res.data.last_page;
      state.mall_module = state.mall_module.concat(res.data.data);

      // 触底判断
      state.loadInfo.loading = false;
      if (state.pageInfo.current_page >= state.pageInfo.page_total || !state.mall_module.length) {
        state.loadInfo.loading = true;
        state.loadInfo.noMore = true;
      }
    },
    RESET_DATA: (state) => {
      state.mall_module = [];
      state.pageInfo = {
        current_page: 0,
        page_total: 0
      };
      state.loadInfo = {
        loading: false,
        noMore: false
      };
    }
  },
  state: () => ({
    mall_module: [],
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
