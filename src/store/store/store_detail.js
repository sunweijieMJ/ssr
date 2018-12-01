import StoreApi from '../../api/mobile/store';

export default {
  namespaced: true,
  actions: {
    async getStoreDetail({commit}, id) {
      await StoreApi().getStoreDetail({brick_id: id}).then(res => {
        if (res.data) commit('STORE_DETAIL', res.data);
      });
    },
    async getStoreContruct({commit}, id) {
      await StoreApi().getStoreContruct({brickstore_id: id}).then(res => {
        if (res.data) commit('STORE_CONSTRUCT', res.data);
      });
    }
  },
  mutations: {
    STORE_DETAIL: (state, res) => {
      state.store_detail = res;
      state.store_list = res.basic.headimgs;
    },
    STORE_CONSTRUCT: (state, res) => {
      state.recoment_list = res;
    }
  },
  state: () => ({
    store_detail: '', // ETC 食品详情
    recoment_list: {}, // ETC 推荐店铺列表
    store_list: [] // ETC 店铺列表
  })
};
