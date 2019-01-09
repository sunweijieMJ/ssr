import MallApi from '../../api/mobile/mall';

export default {
  namespaced: true,
  actions: {
    async getHotList({commit}, data) {
      await MallApi().getHotList(data).then(res => {
        if (res.status) commit('HOT_LIST', res.data);
      });
    },
    async getSearchList({commit}, keyword) {
      await MallApi().getThinkList({keyword}).then(res => {
        if (res.status) commit('SEARCH_LIST', res.data);
      });
    },
    async getHotGoods({commit}) {
      await MallApi().getDetailRecommend(349).then(res => {
        if (res.status) commit('HOT_GOODS', res.data);
      });
    }
  },
  mutations: {
    HOT_LIST: (state, res) => {
      state.hot_list = res;
    },
    SEARCH_LIST: (state, res) => {
      state.search_list = res;
    },
    HOT_GOODS: (state, res) => {
      state.hot_goods = res;
    }
  },
  state: () => ({
    hot_goods: [], // ETC 热门商品
    category: ['家具', '家具', '家具', '家具', '家具', '家具', '家具', '家具'],
    hot_list: [], // ETC 热搜
    search_list: [] // ETC 联想列表
  })
};
