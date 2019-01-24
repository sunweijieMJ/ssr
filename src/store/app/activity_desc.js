import EmbedApi from '../../api/app/embed.js';

export default {
  namespaced: true,
  actions: {
    async getActivityDesc({commit}, id) {
      await EmbedApi().getActivityDesc(id).then((res) => {
        if(res.status) commit('ACTIVITY_DESCRIPTION', res.data);
      });
    }
  },
  mutations: {
    ACTIVITY_DESCRIPTION: (state, data) => {
      state.description = data;
    }
  },
  state: () => ({
    description: {}
  })
};
