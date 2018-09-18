import LifeApi from '../../api/mobile/life';

export default {
  namespaced: true,
  actions: {
    async getActivityList({commit, state}) {
      if (state.loadInfo.loading && state.loadInfo.noMore) return;
      commit('CHANGE_LOADING', true);
      await LifeApi().getActivityList(++state.pageInfo.current_page).then(res => {
        if (res.status) commit('ACTIVITY_LIST', res.data);
      });
    }
  },
  mutations: {
    CHANGE_LOADING: (state, res) => {
      state.loadInfo.loading = res;
    },
    ACTIVITY_LIST: (state, res) => {
      state.pageInfo.current_page = res.current_page;
      state.pageInfo.page_total = res.last_page || 0;
      state.activity_list = state.activity_list.concat(res.data);

      // 触底判断
      state.loadInfo.loading = false;
      if (state.pageInfo.current_page >= state.pageInfo.page_total || !state.activity_list.length) {
        state.loadInfo.loading = true;
        state.loadInfo.noMore = true;
      }
    }
  },
  state: () => ({
    activity_list: [], // ETC 活动列表
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
