import LifeApi from '../../api/mobile/life';

export default {
  namespaced: true,
  actions: {
    async getActivityDetail({commit}, id) {
      await LifeApi().getActivityDetail(id).then(res => {
        if (res.status && res.data) commit('ACTIVITY_DETAIL', res.data);
      });
    }
  },
  mutations: {
    ACTIVITY_DETAIL: (state, res) => {
      state.activity_info = res;
    }
  },
  state: () => ({
    activity_info: null // ETC 活动信息
  })
};
