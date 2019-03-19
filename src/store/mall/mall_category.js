import MallApi from '../../api/mobile/mall';

export default {
  namespaced: true,
  actions: {
    async getCategoryList({commit}) {
      await MallApi().getCategoryList({category_id: 0, children_level: 2}).then(res => {
        if (res.data) commit('CATEGORY_LIST', res.data);
      });
    }
  },
  mutations: {
    CATEGORY_LIST: (state, res) => {
      state.category = res;
    }
  },
  state: () => ({
    category: []
  })
};
