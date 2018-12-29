// 将types.js里的内容存为types对象
import * as types from './types';

const mutations = {
  [types.SHOW_IMAGE]: (state, data) => {
    state.image_popup = data;
  },
  [types.CHANGE_INDEX]: (state, data) => {
    state.image_popup.active = data.active;
  },
  [types.GLOBAL_DATA]: (state, res) => {
    state.global_data = res;
  }
};

export default mutations;
