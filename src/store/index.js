import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

Vue.use(Vuex);

const defaultState = {
  moment: {},
  comments: {},
  count: 0
};
const inBrowser = typeof window !== 'undefined';
// if in browser, use pre-fetched state injected by SSR
const state = (inBrowser && window.__INITIAL_STATE__) || defaultState;
export function createStore() {
  return new Vuex.Store({
    state,
    actions,
    mutations,
    getters
  });
}
