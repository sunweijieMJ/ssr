import LifeApi from '../../api/mobile/life';

export default {
  namespaced: true,
  actions: {
    async getActivityDetail({commit}, id) {
      await LifeApi().getActivityDetail(id).then(res => {
        if (res.status && res.data) commit('ACTIVITY_DETAIL', res.data);
        else commit('SOLD_OUT', true);
      });
    },
    cutToDesc: ({commit}, data) => {
      commit('CUT_TO_DESC', data);
    }
  },
  mutations: {
    ACTIVITY_DETAIL: (state, res) => {
      state.activity_info = res;
    },
    SOLD_OUT: (state, res) => {
      state.sold_out = res;
    },
    CUT_TO_DESC: (state, data) => {
      state.cut_out = data;
    }
  },
  state: () => ({
    activity_info: null, // ETC 商品详情
    sold_out: false, // ETC 商品是否下架
    cut_out: false // ETC 查看描述
  })
};
