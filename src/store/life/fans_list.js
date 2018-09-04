import LifeApi from '../../api/mobile/life';

export default {
  namespaced: true,
  actions: {
    async getFansList({commit, state}, id) {
      if (state.loadInfo.loading && state.loadInfo.noMore) return;
      commit('CHANGE_LOADING', true);
      await LifeApi().getFansOrIdols({user_id: id, curpage: ++state.pageInfo.current_page, funs: 1}).then(res => {
        if (res.status) commit('FANS_LIST', res.data);
      });
    }
  },
  mutations: {
    FANS_LIST: (state, res) => {
      state.pageInfo.page_total = res.last_page;
      if (typeof res === 'object') {
        state.fanslist = state.fanslist.concat(res.data);
      }
      for (let i = 0, LEN = state.fanslist.length; i < LEN; i++) {
        state.fanslist[i].skip_id = state.fanslist[i].object_user_id;
      }

      state.loadInfo.loading = false;
      if (state.pageInfo.current_page >= state.pageInfo.page_total || !state.fanslist.length) {
        state.loadInfo.loading = true;
        state.loadInfo.noMore = true;
      }
    },
    CHANGE_LOADING: (state, res) => {
      state.loadInfo.loading = res;
    }
  },
  state: () => ({
    fanslist: [],
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
