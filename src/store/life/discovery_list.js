import LifeApi from '../../api/mobile/life';

export default {
  namespaced: true,
  actions: {
    async getDiscoveryList({commit}) {
      await LifeApi().getDiscoveryList().then(res => {
        if (res.status) commit('DISCOVERY_LIST', res.data);
      });
    },
    async getUserSearchList({commit}, name) {
      await LifeApi().getUserSearchList(name).then(res => {
        if (res.status) commit('USER_SEARCH_LIST', res.data);
      });
    }
  },
  mutations: {
    DISCOVERY_LIST: (state, res) => {
      state.test = res;
      state.hot_activity = res.activity.data;
      state.hot_article = res.article;
      state.hot_topic = res.topic;
    },
    USER_SEARCH_LIST: (state, res) => {
      if (res instanceof Array) state.search_list = res;
      else state.search_list = [];

      for (let i = 0, LEN = state.search_list.length; i < LEN; i++) {
        state.search_list[i].skip_id = state.search_list[i].id;
      }
    }
  },
  state: () => ({
    test: null,
    hot_activity: [],
    hot_article: [],
    hot_topic: [],
    search_list: []
  })
};
