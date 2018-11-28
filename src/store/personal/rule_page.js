import PersonalApi from '../../api/mobile/personal';
export default {
  namespaced: true,
  actions: {
    async getResult({commit}, data) {
      await PersonalApi().getResult(data).then(res => {
        console.log(res)
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
    RESULT: (state, res) => {
      if(res){
        state.status = res.status;
      }
    },
    LOGIN: (state, res) => {
      if(res){
        state.skip_state = true;
      }
    }
  },
  state: () => ({
    data: {
      status: '',
      skip_state: false
    }
  })
};
