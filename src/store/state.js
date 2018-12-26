// vuex的数据中心
const defaultState = {
  image_popup: { // ETC 大图展示弹框显隐
    status: false,
    active: 0,
    source: []
  },
  link_popup: { // ETC 引导页显隐
    status: false
  },
  global_data: ''
};

const inBrowser = typeof window !== 'undefined';
// if in browser, use pre-fetched state injected by SSR
const state = (inBrowser && window.__INITIAL_STATE__) || defaultState;

export default state;
