import MallApi from '../../api/mobile/mall';

export default {
  namespaced: true,
  actions: {
    async getHotList({commit}, data) {
      await MallApi().getHotList(data).then(res => {
        console.log(res);
        if (res.status) commit('HOT_LIST', res.data);
      });
    },
    async getSearchList({commit}, keyword) {
      await MallApi().getThinkList({keyword}).then(res => {
        console.log(res);
        if (res.status) commit('SEARCH_LIST', res.data);
      });
    }
  },
  mutations: {
    HOT_LIST: (state, res) => {
      state.hot_list = res;
    },
    SEARCH_LIST: (state, res) => {
      state.search_list = res;
    }
  },
  state: () => ({
    hot_list: [], // ETC 热搜
    search_list: [] // ETC 搜索联想列表
  })
};
