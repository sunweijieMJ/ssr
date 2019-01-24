import MallApi from '../../api/mobile/mall';

export default {
  namespaced: true,
  actions: {
    async getModuleDesc({commit}, module_id) {
      await MallApi().getArtificial({module_id}).then((res) => {
        if(res.status) commit('MODULE_DESCRIPTION', res.data);
      });
    }
  },
  mutations: {
    MODULE_DESCRIPTION: (state, data) => {
      state.description = data.desc;
    }
  },
  state: () => ({
    description: {}
  })
};
