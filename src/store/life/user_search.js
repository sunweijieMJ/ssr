import LifeApi from '../../api/mobile/life';

export default {
  namespaced: true,
  actions: {
    async getUserSearchList({commit}, name) {
      await LifeApi().getUserSearchList(name).then(res => {
        if (res.status) commit('USER_SEARCH_LIST', res.data);
      });
    }
  },
  mutations: {
    USER_SEARCH_LIST: (state, res) => {
      if (res instanceof Array) state.search_list = res;
      else state.search_list = [];
    }
  },
  state: () => ({
    search_list: []
  })
};
