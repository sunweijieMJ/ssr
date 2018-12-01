import ToolApi from '../../api/mobile/tools';

export default {
  namespaced: true,
  actions: {
    async getCountryCode({commit}) {
      await ToolApi().getCountryCode().then(res => {
        if (res.status && res.data) commit('COUNTRY_CODE', res.data);
      });
    }
  },
  mutations: {
    COUNTRY_CODE: (state, data) => {
      state.code_list = data;
    }
  },
  state: () => ({
    code_list: []
  })
};
