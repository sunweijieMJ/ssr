import LifeApi from '../../api/mobile/life';

export default {
  namespaced: true,
  actions: {
    async getDiscoveryList({commit}) {
      await LifeApi().getDiscoveryList().then(res => {
        if (res.status) commit('DISCOVERY_LIST', res.data);
      });
    }
  },
  mutations: {
    DISCOVERY_LIST: (state, res) => {
      state.test = res;
      state.hot_activity = res.activity.data;
      state.hot_article = res.article;
      state.hot_topic = res.topic;
    }
  },
  state: () => ({
    test: null,
    hot_activity: [],
    hot_article: [],
    hot_topic: []
  })
};
