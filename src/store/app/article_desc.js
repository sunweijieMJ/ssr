import LifeApi from '../../api/mobile/life';

export default {
  namespaced: true,
  actions: {
    async getArticleDetail({commit}, id) {
      await LifeApi().getArticleDetail(id).then((res) => {
        commit('ARTICLE_DETAIL', res.data);
      });
    }
  },
  mutations: {
    ARTICLE_DETAIL: (state, data) => {
      state.description = data.content;
    }
  },
  state: () => ({
    description: {}
  })
};
