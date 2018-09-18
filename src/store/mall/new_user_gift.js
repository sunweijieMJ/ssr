import MallApi from '../../api/mobile/mall';

export default {
  namespaced: true,
  actions: {
    async getNewUserGift({commit}) {
      await MallApi().getNewUserGift().then(res => {
        if (res.status) commit('NEW_USER_GIFT', res.data);
      });
    }
  },
  mutations: {
    NEW_USER_GIFT: (state, res) => {
      state.gift_info = res;
    }
  },
  state: () => ({
    gift_info: null
  })
};
