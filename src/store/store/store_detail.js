import StoreApi from '../../api/mobile/store';
import PersonalApi from '../../api/mobile/personal';
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
    },
    // logo
    async getLogo({commit}, data) {
      await PersonalApi().getLogo(data).then(res => {
        if (res.status) commit('LOGO', res);
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
    },
    LOGO: (state, res) => {
      state.logo = res.data.logo;
    }
  },
  state: () => ({
    store_detail: '', // ETC 食品详情
    recoment_list: {}, // ETC 推荐店铺列表
    logo: '', // ETC LOGO
    store_list: [] // ETC 店铺列表
  })
};
