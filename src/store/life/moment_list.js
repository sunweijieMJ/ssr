import LifeApi from '../../api/mobile/life';

export default {
  namespaced: true,
  actions: {
    async getHotTopic({commit}) {
      await LifeApi().getHotTopicList().then(res => {
        if (res.status) commit('HOT_TOPIC', res.data);
      });
    },
    async getMomentList({commit, state}, id) {
      if (state.loadInfo.loading && state.loadInfo.noMore) return;
      commit('CHANGE_LOADING', true);
      await LifeApi().getMomentList(++state.pageInfo.current_page).then(res => {
        if (res.status) commit('MOMENT_LIST', res.data);
      });
    }
  },
  mutations: {
    HOT_TOPIC: (state, res) => {
      state.hot_topic_list = res;
    },
    CHANGE_LOADING: (state, res) => {
      state.loadInfo.loading = res;
    },
    MOMENT_LIST: (state, res) => {
      state.pageInfo.page_total = res.page_total;
      state.moment_list = state.moment_list.concat(res.data);

      // 触底判断
      state.loadInfo.loading = false;
      if (state.pageInfo.current_page >= state.pageInfo.page_total || !state.moment_list.length) {
        state.loadInfo.loading = true;
        state.loadInfo.noMore = true;
      }
    }
  },
  state: () => ({
    hot_topic_list: [], // ETC 热门话题
    moment_list: [], // ETC 动态
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
