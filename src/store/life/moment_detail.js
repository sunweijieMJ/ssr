import LifeApi from '../../api/life/Life';

export default {
  namespaced: true,
  actions: {
    getMomentDetail: ({commit}, id) => {
      LifeApi().getMomentDetail(id).then(res => {
        if (!res.state) commit('MOMENT_DETAIL', res);
      });
    }
  },
  mutations: {
    MOMENT_DETAIL: (state, res) => {
      state.moment_detail_info = res;
    }
  },
  state: () => ({
    moment_detail_info: {}
  }),
  getters: {
    moment_detail_info: state => state.moment_detail_info
  }
};
