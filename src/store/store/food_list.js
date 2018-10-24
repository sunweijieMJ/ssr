import StoreApi from '../../api/mobile/store';

export default {
  namespaced: true,
  actions: {
    async getCategoryList({commit}) {
      await StoreApi().getCategoryList({brick_id: 2, category_id: 0}).then(res => {
        if (res.status && res.data) commit('CATEGORY_LIST', res.data);
      });
    },
    async getFoodList({commit}) {
      await StoreApi().getFoodList({brick_id: 2, page: 1, page_size: 10, category_id: 0, with_specs: 1, with_options: 1}).then(res => {
        console.log(res);
        if (res.status && res.data) commit('FOOD_LIST', res.data);
      });
    },
    cutFoodPopup: ({commit}, data) => {
      commit('FOOD_POPUP', data);
    }
  },
  mutations: {
    CATEGORY_LIST: (state, res) => {
      state.category_list = res;
    },
    FOOD_LIST: (state, res) => {
      state.food_list = res;
    },
    FOOD_POPUP: (state, data) => {
      state.food_popup = data;
    }
  },
  state: () => ({
    category_list: null, // ETC 食品品类列表
    food_list: null, // ETC 食品列表
    food_popup: { // ETC 食品选购弹框
      status: false
    }
  })
};
