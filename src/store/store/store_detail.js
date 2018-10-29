import StoreApi from '../../api/mobile/store';

export default {
  namespaced: true,
  actions: {
    async getStoreDetail({commit}, data) {
      await StoreApi().getStoreDetail({brick_id: data.id}).then(res => {
        if (res.data) commit('STORE_DETAIL', res.data);
      });
    }
  },
  mutations: {
    STORE_DETAIL: (state, res) => {
      state.store_detail = res;
      state.store_list = res.basic.headimgs;
    }
  },
  state: () => ({
    store_detail: '', // ETC 食品详情
    store_list: [] // ETC 店铺列表
  })
};
