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
      console.log(res)
      state.store_detail = res;
    }
  },
  state: () => ({
    store_detail: '', // ETC 食品详情
    ready: ''
  })
};
