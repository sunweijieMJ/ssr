import StoreApi from '../../api/mobile/store';

export default {
  namespaced: true,
  actions: {
    async getFoodDetail({commit}, id) {
      await StoreApi().getFoodDetail(id).then(res => {
        if (res.status && res.data) commit('FOOD_DETAIL', res.data);
        else commit('SOLD_OUT', true);
      });
    }
  },
  mutations: {
    FOOD_DETAIL: (state, res) => {
      state.food_info = res;
    },
    SOLD_OUT: (state, res) => {
      state.sold_out = res;
    }
  },
  state: () => ({
    food_info: null, // ETC 食品详情
    sold_out: false // ETC 食品是否下架
  })
};
