import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import actions from './actions';
import mutations from './mutations';
import state from './state';
import getters from './getters';

export function createStore() {
  return new Vuex.Store({
    actions,
    mutations,
    state,
    getters
  });
}
