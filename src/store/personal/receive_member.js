import PersonalApi from '../../api/mobile/personal';

export default {
  namespaced: true,
  actions: {
    async getInvited({commit}, data) {
      await PersonalApi().getInvited({content_id: data.content_id, lh_authinfo: data.lh_authinfo}).then(res => {
        if (res.status) commit('INVITED', res.data);
        localStorage.removeItem('lh_authinfo');
      }).catch(() => {
        localStorage.removeItem('lh_authinfo');
      });
    },
    // 发送验证码
    async getIdentify({commit}, data) {
      await PersonalApi().getIdentify(data).then(res => {
        if (res.status) commit('INDENTIFY', res.data);
      });
    },
    // 领取会员
    async getResult({commit}, data) {
      await PersonalApi().getResult(data).then(res => {
        if (res.status) commit('RESULT', res.data);
        localStorage.removeItem('lh_authinfo');

      }).catch(() => {
        localStorage.removeItem('lh_authinfo');
      });
    },
    // 登陆
    async getLogin({commit}, data) {
      await PersonalApi().getLogin(data).then(res => {
        if (res.status) commit('LOGIN', res);
      });
    },
    // logo
    async getLogo({commit}, data) {
      await PersonalApi().getLogo(data).then(res => {
        if (res.status) commit('LOGO', res);
      });
    },

    // 新手礼包页面信息
    async getNewGift({commit}, data) {
      await PersonalApi().getNewGift(data).then(res => {
        if (res.status) commit('NEW_GIFT', res);
      });
    },

    // 新人礼包领取
    async getNewGiftMessage({commit}, data) {
      await PersonalApi().getNewGiftMessage(data).then(res => {
        commit('NEW_GIFT_MESSAGE', res);
      });
    }
  },
  mutations: {
    INVITED: (state, res) => {
      state.data = res;
    },
    INDENTIFY: (state, res) => {
      // state.data = res;
    },
    RESULT: (state, res) => {
      if(res){
        state.status = res.status;
      }
    },
    LOGIN: (state, res) => {
      if(res.status){
        state.skip_state = true;
      }
    },
    LOGO: (state, res) => {
      state.logo = res.data.logo;
    },
    NEW_GIFT: (state, res) => {
      state.gift_info = res.data;
    },
    NEW_GIFT_MESSAGE: (state, res) => {
      state.gift_message = res.data.isNewUser;
    }
  },
  state: () => ({
    data: {},
    status: 0,
    skip_state: false,
    logo: '',
    gift_message: null, // ETC 是否为新用户
    gift_info: '' // ETC 礼包信息
  })
};
