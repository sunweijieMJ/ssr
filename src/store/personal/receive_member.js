import PersonalApi from '../../api/mobile/personal';

export default {
  namespaced: true,
  actions: {
    async getInvited({commit}, data) {
      await PersonalApi().getInvited({content_id: data.content_id, lh_authinfo: data.lh_authinfo}).then(res => {
        if (res.status) commit('INVITED', res.data);
      });
    },
    // 发送验证码
    async getIdentify({commit}, data) {
      await PersonalApi().getIdentify(data).then(res => {
        console.log('验证码', res)
        if (res.status) commit('INDENTIFY', res.data);
      });
    },
    // 领取会员
    async getResult({commit}, data) {
      await PersonalApi().getResult(data).then(res => {
        console.log('领取：', res)
        if (res.status) commit('RESULT', res.data);
      });
    },
    // 登陆
    async getLogin({commit}, data) {
      await PersonalApi().getLogin(data).then(res => {
        console.log(res)
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
        console.log(res)
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
    status: '',
    skip_state: false
  })
};
