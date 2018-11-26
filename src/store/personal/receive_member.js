import PersonalApi from '../../api/mobile/personal';

export default {
  namespaced: true,
  actions: {
    async getInvited({commit}, data) {
      await PersonalApi().getInvited({content_id: data.content_id, lh_authinfo: data.lh_authinfo, isnocheck: 1}).then(res => {
        console.log(res)
        if (res.status) commit('INVITED', res.data);
      });
    },
    // 发送验证码
    async getIdentify({commit}, data) {
      await PersonalApi().getIdentify({mobile: data.content_id, country_num: data.lh_authinfo, isnocheck: 1}).then(res => {
        console.log(res)
        if (res.status) commit('INVITED', res.data);
      });
    },

    // 领取会员
    async getLogin({commit}, data) {
      await PersonalApi().getLogin({mobile: data.content_id, country_num: data.lh_authinfo, isnocheck: 1}).then(res => {
        console.log(res)
        if (res.status) commit('LOGIN', res.data);
      });
    }
  },
  mutations: {
    LOGIN: (state, res) => {

    }
  },
  state: () => ({
    data: {}
  })
};
