import LifeApi from '../../api/mobile/life';

export default {
  namespaced: true,
  actions: {
    async getStickList({commit}) {
      await LifeApi().getStickList().then(res => {
        if (res.status) commit('STICK_LIST', res.data);
      });
    },
    async getFocusList({commit, state}) {
      if (state.loadInfo.loading && state.loadInfo.noMore) return;
      commit('CHANGE_LOADING', true);
      await LifeApi().getFocusList(state.pageInfo.current_page, 1).then(res => {
        if (res.status) commit('CHOICENESS_LIST', res.data);
      });
    },
    async getModuleFeedList({commit}) {
      await LifeApi().getModuleFeedList({}).then(res => {
        if (res.status) commit('MODULE_FEED_LIST', res.data);
      });
    }
  },
  mutations: {
    STICK_LIST: (state, res) => {
      state.stick_list = res;
    },
    CHANGE_LOADING: (state, res) => {
      state.loadInfo.loading = res;
    },
    CHOICENESS_LIST: (state, res) => {
      state.pageInfo.current_page = res.created_at;
      state.feed_list = state.feed_list.concat(res.items);

      // 触底判断
      state.loadInfo.loading = false;
      if (res.total < 0) {
        state.loadInfo.loading = true;
        state.loadInfo.noMore = true;
      }
    },
    MODULE_FEED_LIST: (state, res) => {
      state.module_list = res;
    }
  },
  state: () => ({
    stick_list: [], // ETC 置顶
    feed_list: [], // ETC 精选
    module_list: [], // ETC 榜单列表
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
