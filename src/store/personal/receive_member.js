import PersonalApi from '../../api/mobile/personal';

export default {
  namespaced: true,
  actions: {
    async getInvited({commit}, data) {
      await PersonalApi().getInvited({content_id: data.content_id, lh_authinfo: data.lh_authinfo}).then(res => {
        if (res.status) commit('INVITED', res.data);
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
      });
    },
    // 登陆
    async getLogin({commit}, data) {
      await PersonalApi().getLogin(data).then(res => {
        if (res.status) commit('LOGIN', res);
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
    }
  },
  state: () => ({
    data: {},
    status: 0,
    skip_state: false
  })
};
