import StoreApi from '../../api/mobile/store';

export default {
  namespaced: true,
  actions: {
    async getFoodList({commit}, store_id) {
      await StoreApi().getFoodList(store_id).then(res => {
        if (res.status && res.data) commit('FOOD_LIST', res.data);
      });
    },
    cutFoodPopup: ({commit}, data) => {
      commit('FOOD_POPUP', data);
    },
    changeCart: ({commit}, data) => {
      commit('CART_LIST', data);
    }
  },
  mutations: {
    FOOD_LIST: (state, res) => {
      state.food_list = res;
      state.cart_list = res;
      for (let i = 0, ILEN = state.cart_list.length; i < ILEN; i++) {
        for (let j = 0, JLEN = state.cart_list[i].products.length; j < JLEN; j++) {
          state.cart_list[i].products[j].buy_count = 0;
        }
      }
    },
    CART_LIST: (state, res) => {
      state.cart_list = res;
    },
    FOOD_POPUP: (state, data) => {
      state.food_popup = data;
      state.food_popup.option = state.cart_list[data.index.i].products[data.index.j];
      if (data.symbol === true) {
        state.cart_list[data.index.i].products[data.index.j].buy_count++;
      } else if (data.symbol === false) {
        state.cart_list[data.index.i].products[data.index.j].buy_count--;
      }

    }
  },
  state: () => ({
    food_list: null, // ETC 食品列表
    cart_list: [], // ETC 购物车列表
    food_popup: { // ETC 食品选购弹框
      status: false,
      option: {}
    }
  })
};
