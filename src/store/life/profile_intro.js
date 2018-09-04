import LifeApi from '../../api/mobile/life';

export default {
  namespaced: true,
  actions: {
    async getUserInfo({commit}, id) {
      await LifeApi().getUserInfo(id).then(res => {
        if (res.status) commit('PROFILE_INFO', res.data);
      });
    }
  },
  mutations: {
    PROFILE_INFO: (state, res) => {
      state.user_info = res;
    }
  },
  state: () => ({
    user_info: null // ETC 用户信息
  })
};
