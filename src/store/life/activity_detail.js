import LifeApi from '../../api/mobile/life';

export default {
  namespaced: true,
  actions: {
    async getActivityDetail({commit}, id) {
      await LifeApi().getActivityDetail(id).then(res => {
        if (res.status) commit('ACTIVITY_DETAIL', res.data);
        else commit('SOLD_OUT', true);
      });
    },
    async getGlobal({commit}) {
      await LifeApi().getGlobal().then(res => {
        if(res.status) commit('GLOBAL', res.data);
      });
    }
  },
  mutations: {
    ACTIVITY_DETAIL: (state, res) => {
      state.activity_info = res;
    },
    SOLD_OUT: (state, res) => {
      state.sold_out = res;
    },
    GLOBAL: (state, res) => {
      state.global = res;
    }
  },
  state: () => ({
    activity_info: null, // ETC 商品详情
    sold_out: false, // ETC 商品是否下架
    global: ''
  })
};
