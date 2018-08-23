// vuex的数据中心
import homeData from './official/homeData.js';
import aboutData from './official/aboutData.js';
import productData from './official/productData.js';
import partnerData from './official/partnerData.js';
import joinData from './official/joinData.js';
const defaultState = {
  homeData,
  aboutData,
  productData,
  partnerData,
  joinData,
  ImagePopup: { // ETC 大图展示弹框显隐
    status: false,
    active: 0,
    source: []
  }
};
const inBrowser = typeof window !== 'undefined';
// if in browser, use pre-fetched state injected by SSR
const state = (inBrowser && window.__INITIAL_STATE__) || defaultState;

export default state;
