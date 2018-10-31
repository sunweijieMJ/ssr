import StoreApi from '../../api/mobile/store';

export default {
  namespaced: true,
  actions: {
    async getFoodDetail({commit}, {store_id, food_id}) {
      await StoreApi().getFoodDetail({product_id: food_id, store_id, with_basic: 1, with_options: 1, with_specs: 1, with_joyful: 1}).then(res => {
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
