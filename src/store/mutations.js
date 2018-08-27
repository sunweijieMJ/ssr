// 将types.js里的内容存为types对象
import * as types from './types';

const mutations = {
  CHANGE_LOADING: (state, res) => {
    state.loadInfo.loading = res;
  },
  COMMENT_LIST: (state, res) => {
    state.pageInfo.page_total = res.page_total;
    if (state.comment_list) {
      state.comment_list = state.comment_list.concat(res.data);
    } else {
      state.comment_list = res.data;
    }
    // 触底判断
    state.loadInfo.loading = false;
    if (state.pageInfo.current_page >= state.pageInfo.page_total || !state.comment_list.length) {
      state.loadInfo.loading = true;
      state.loadInfo.noMore = true;
    }
  },

  UPDATE_DYNAMIC: (state, data) => {
    state.dynamic = {...data};
  },
  [types.SHOW_IMAGE]: (state, data) => {
    state.ImagePopup = data;
  }
};

export default mutations;
