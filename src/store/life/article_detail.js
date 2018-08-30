import LifeApi from '../../api/mobile/life';

export default {
  namespaced: true,
  actions: {
    async getArticleDetail({commit}, {id, preview}) {
      await LifeApi().getArticleDetail(id, preview).then(res => {
        if (res.status) commit('ARTICLE_DETAIL', res.data);
      });
    },
    async getCommentsTitle({commit}, {entity_id, entity_type}) {
      await LifeApi().getThumbList({entity_id, entity_type}).then(res => {
        if (res.status) commit('COMMENT_TITLE', res.data);
      });
    },
    async getCommentsList({commit, state}, id) {
      if (state.loadInfo.loading && state.loadInfo.noMore) return;
      commit('CHANGE_LOADING', true);
      await LifeApi().getCommentsList({entity_id: id, entity_type: 1, page: ++state.pageInfo.current_page}).then(res => {
        if (res.status) commit('COMMENT_LIST', res.data);
      });
    }
  },
  mutations: {
    ARTICLE_DETAIL: (state, res) => {
      state.article_detail_info = res;
    },
    COMMENT_TITLE: (state, res) => {
      state.comment_title = res;
    },
    CHANGE_LOADING: (state, res) => {
      state.loadInfo.loading = res;
    },
    COMMENT_LIST: (state, res) => {
      state.pageInfo.page_total = res.page_total || 0;
      if (state.comment_list) {
        state.comment_list = state.comment_list.concat(res.data);
      } else {
        state.comment_list = res.data;
      }
      // 触底判断
      state.loadInfo.loading = false;
      if (state.pageInfo.current_page >= state.pageInfo.page_total || !state.comment_list.length) {
        state.loadInfo.loading = true;
        state.loadInfo.noMore = true;
      }
    }
  },
  state: () => ({
    article_detail_info: null, // ETC 文章详情
    comment_title: null, // ETC 赞列表
    comment_list: null, // ETC 评论列表
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
