import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import actions from './actions';
import mutations from './mutations';
import getters from './getters';

import joinData from './official/joinData.js';
import homeData from './official/homeData.js';
import aboutData from './official/aboutData.js';
import productData from './official/productData.js';
import partnerData from './official/partnerData.js';
const defaultState = {
  homeData,
  aboutData,
  productData,
  partnerData,
  joinData,
  moment: {},
  comments: {},
  count: 0
};
const inBrowser = typeof window !== 'undefined';
// if in browser, use pre-fetched state injected by SSR
const state = (inBrowser && window.__INITIAL_STATE__) || defaultState;
export function createStore() {
  return new Vuex.Store({
    actions,
    mutations,
    state,
    getters
  });
}
