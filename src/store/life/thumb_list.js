import LifeApi from '../../api/mobile/life';

export default {
  namespaced: true,
  actions: {
    async getThumbList({commit, state}, {id, type}) {
      if (state.loadInfo.loading && state.loadInfo.noMore) return;
      commit('CHANGE_LOADING', true);
      await LifeApi().getThumbList({entity_id: id, entity_type: type, page: ++state.pageInfo.current_page}).then(res => {
        if(res.status) commit('THUMB_LIST', res.data);
      });
    }
  },
  mutations: {
    THUMB_LIST: (state, res) => {
      state.pageInfo.page_total = res.lastPage;
      state.thumb_list = state.thumb_list.concat(res.items);
      for (let i = 0, LEN = state.thumb_list.length; i < LEN; i++) {
        state.thumb_list[i].skip_id = state.thumb_list[i].id;
      }

      state.loadInfo.loading = false;
      if (state.pageInfo.current_page >= state.pageInfo.page_total || !state.thumb_list.length) {
        state.loadInfo.loading = true;
        state.loadInfo.noMore = true;
      }
    },
    CHANGE_LOADING: (state, res) => {
      state.loadInfo.loading = res;
    }
  },
  state: () => ({
    thumb_list: [], // ETC 列表
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
