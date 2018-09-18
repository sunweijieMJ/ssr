import LifeApi from '../../api/mobile/life';

export default {
  namespaced: true,
  actions: {
    async getArticleList({commit, state}) {
      if (state.loadInfo.loading && state.loadInfo.noMore) return;
      commit('CHANGE_LOADING', true);
      await LifeApi().getArticleList(++state.pageInfo.current_page).then(res => {
        if (res.status) commit('ARTICLE_LIST', res.data);
      });
    }
  },
  mutations: {
    CHANGE_LOADING: (state, res) => {
      state.loadInfo.loading = res;
    },
    ARTICLE_LIST: (state, res) => {
      state.pageInfo.current_page = res[0].current_page;
      state.pageInfo.page_total = res[0].page_total || 0;
      state.article_list = state.article_list.concat(res[0].data);

      // 触底判断
      state.loadInfo.loading = false;
      if (state.pageInfo.current_page >= state.pageInfo.page_total || !state.article_list.length) {
        state.loadInfo.loading = true;
        state.loadInfo.noMore = true;
      }
    }
  },
  state: () => ({
    article_list: [], // ETC 活动列表
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
