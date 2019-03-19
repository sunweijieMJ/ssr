import LifeApi from '../../api/mobile/life';

export default {
  namespaced: true,
  actions: {
    async getArticleList({commit, state}, column_id) {
      if (state.loadInfo.loading && state.loadInfo.noMore) return;
      commit('CHANGE_LOADING', true);
      await LifeApi().getArticleList({column_id, page: ++state.pageInfo.current_page}).then(res => {
        if (res.status) commit('ARTICLE_LIST', res.data);
      });
    }
  },
  mutations: {
    CHANGE_LOADING: (state, res) => {
      state.loadInfo.loading = res;
    },
    ARTICLE_LIST: (state, res) => {
      state.column_title = res[0].column_title;
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
    column_title: '', // ETC 文章标题
    article_list: [], // ETC 文章列表
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
