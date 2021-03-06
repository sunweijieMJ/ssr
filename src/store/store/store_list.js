import StoreApi from '../../api/mobile/store';
import shop_bg from '../../.././static/mobile/img/h5/shop_bg.jpg';

export default {
  namespaced: true,
  actions: {
    async getStoreList({commit}) {
      await StoreApi().getStoreList().then(res => {
        if (res.data) commit('STORE_LIST', res.data);
      });
    }
  },
  mutations: {
    STORE_LIST: (state, res) => {
      state.store_list = res;
    }
  },
  state: () => ({
    default_diagram: shop_bg, // ETC 默认图
    store_list: [] // ETC 店铺列表
  })
};
