// vuex的数据中心

const defaultState = {
  comment_list: null, // ETC 评论列表
  pageInfo: {
    current_page: 0, // ETC 当前页
    page_total: 0 // ETC 总页数
  },
  loadInfo: {
    loading: false, // ETC 是否loading
    noMore: false // ETC 是否到底
  },
  /*
   * moment: {},
   * comments: {},
   * count: 0,
   */

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
