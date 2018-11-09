import MallApi from '../../api/mobile/mall';

export default {
  namespaced: true,
  actions: {
    async getExhibitList({commit}, data) {
      await MallApi().getExhibitList(data).then(res => {
        if (res.status) commit('EXHIBIT_LIST', res.data);
      });
    }
  },
  mutations: {
    EXHIBIT_LIST: (state, res) => {
      state.exhibit_list = res;
    }
  },
  state: () => ({
    exhibit_list: []
  })
};
