import StoreApi from '../../api/mobile/store';

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
      // console.log(res)
      state.store_list = res;
      console.log(state.store_list)
    }
  },
  state: () => ({
    store_list: [] // ETC 店铺列表
  })
};
