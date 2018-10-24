import StoreApi from '../../api/mobile/store';

export default {
  namespaced: true,
  actions: {
    async getFoodList({commit}) {
      await StoreApi().getFoodList().then(res => {
        if (res.status && res.data) commit('FOOD_LIST', res.data);
      });
    },
    cutFoodPopup: ({commit}, data) => {
      commit('FOOD_POPUP', data);
    }
  },
  mutations: {
    FOOD_LIST: (state, res) => {
      state.food_list = res;
    },
    FOOD_POPUP: (state, data) => {
      state.food_popup = data;
    }
  },
  state: () => ({
    food_list: null, // ETC 食品列表
    food_popup: { // ETC 食品选购弹框
      status: false
    }
  })
};
