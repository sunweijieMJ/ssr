import LifeApi from '../../api/mobile/life';

export default {
  namespaced: true,
  actions: {
    async getActivityDetail({commit}, id) {
      await LifeApi().getActivityDetail(id).then(res => {
        if (res.status && res.data) commit('ACTIVITY_DETAIL', res.data);
        else commit('SOLD_OUT', true);
      });
    }
  },
  mutations: {
    ACTIVITY_DETAIL: (state, res) => {
      state.activity_info = res;
    },
    SOLD_OUT: (state, res) => {
      state.sold_out = res;
    }
  },
  state: () => ({
    activity_info: null, // ETC 商品详情
    sold_out: false // ETC 商品是否下架
  })
};
