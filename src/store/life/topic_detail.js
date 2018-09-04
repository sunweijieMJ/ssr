import LifeApi from '../../api/mobile/life';

export default {
  namespaced: true,
  actions: {
    async getTopicDetail({commit}, data) {
      await LifeApi().getTopicDetail(data).then(res => {
        if(res.status && res.data) commit('TOPIC_DETAIL', res.data);
      });
    },
    async getTopicDynamic({commit, state}, id) {
      if (state.loadInfo.loading && state.loadInfo.noMore) return;
      commit('CHANGE_LOADING', true);
      await LifeApi().getTopicDynamic({entity_type: 3, entity_id: id, page: ++state.pageInfo.current_page}).then(res => {
        if (res.status) commit('TOPIC_DYNAMIC', res.data);
      });
    },
    cutToIntro: ({commit}, data) => {
      commit('CUT_TO_INTRO', data);
    }
  },
  mutations: {
    TOPIC_DETAIL: (state, res) => {
      state.topic_detail = res;
    },
    TOPIC_DYNAMIC: (state, res) => {
      state.pageInfo.page_total = res.page_total || 0;
      state.topic_dynamic = state.topic_dynamic.concat(res.data);

      // 触底判断
      state.loadInfo.loading = false;
      if (state.pageInfo.current_page >= state.pageInfo.page_total || !state.topic_dynamic.length) {
        state.loadInfo.loading = true;
        state.loadInfo.noMore = true;
      }
    },
    CHANGE_LOADING: (state, res) => {
      state.loadInfo.loading = res;
    },
    CUT_TO_INTRO: (state, data) => {
      state.cut_out = data;
    }
  },
  state: () => ({
    topic_detail: '', // ETC 话题详情
    topic_dynamic: [], // ETC 评论列表
    cut_out: false, // ETC 查看简介
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
