/*
 *import createdynamic from '../../api/dynamic';
 *const dynamic = new createdynamic();
 */
import dynamic from '../../api/dynamic';

export default {
  namespaced: true,
  state: () => ({
    count: 0,
    dynamic: {}
  }),
  actions: {
    fetchMomentList: ({commit}) => {
      dynamic.getDynamicById(123).then((res) => {
        commit('UPDATE_DYNAMIC', res.data);
      });
    },
    inc: ({commit}) => commit('inc')
  },
  mutations: {
    inc: state => state.count++,
    UPDATE_DYNAMIC: (state, data) => {
      state.dynamic = {...data};
    }
  },
  getters: {
    getdynamic: state => state.dynamic,
    getinc: state => state.inc
  }
};
