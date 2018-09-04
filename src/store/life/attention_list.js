import LifeApi from '../../api/mobile/life';

export default {
  namespaced: true,
  actions: {
    async getAttention({commit, state}, id) {
      if(state.loadInfo.loading && state.loadInfo.noMore) return;
      commit('CHANGE_LOADING', true);
      await LifeApi().getFansOrIdols({user_id: id, curpage: ++state.pageInfo.current_page, funs: 0}).then(res => {
        if(res.status) commit('ATTENTION_LIST', res.data);
      });
    }
  },
  mutations: {
    ATTENTION_LIST: (state, res) => {
      state.pageInfo.page_total = res.last_page;
      if (typeof res === 'object') {
        state.attention = state.attention.concat(res.data);
      }
      for (let i = 0, LEN = state.attention.length; i < LEN; i++) {
        state.attention[i].skip_id = state.attention[i].object_user_id;
      }

      state.loadInfo.loading = false;
      if (state.pageInfo.current_page >= state.pageInfo.page_total || !state.attention.length) {
        state.loadInfo.loading = true;
        state.loadInfo.noMore = true;
      }
    },
    CHANGE_LOADING: (state, res) => {
      state.loadInfo.loading = res;
    }
  },
  state: () => ({
    attention: [],
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
