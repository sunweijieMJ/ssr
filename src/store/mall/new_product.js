import MallApi from '../../api/mobile/mall';
export default {
  namespaced: true,
  actions: {
    async getNewProduct({commit}) {
      await MallApi().getNewProduct({}).then(res => {
        if (res.data) commit('PRODUCT_LIST', res.data);
      });
    }
  },
  mutations: {
    PRODUCT_LIST: (state, res) => {
      state.product_list = res;
    }
  },
  state: () => ({
    product_list: ['哈喽'], // ETC 店铺列表
    loadInfo: {
      loading: false, // ETC 是否loading
      noMore: false // ETC 是否到底
    }
  })
};
