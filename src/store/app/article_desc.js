import LifeApi from '../../api/mobile/life';

export default {
  namespaced: true,
  actions: {
    async getArticleDetail({commit}, article_id) {
      await LifeApi().getArticleDetail({article_id}).then((res) => {
        if(res.status) commit('ARTICLE_DETAIL', res.data);
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
