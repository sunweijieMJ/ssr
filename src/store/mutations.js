// 将types.js里的内容存为types对象
import * as types from './types';

const mutations = {
  [types.SHOW_IMAGE]: (state, data) => {
    state.ImagePopup = data;
  },
  [types.CHANGE_INDEX]: (state, data) => {
    state.ImagePopup.active = data.active;
  },
  [types.GUIDE_POPUP]: (state, data) => {
    state.guidePopup = data;
  },
  [types.GLOBAL_DATA]: (state, res) => {
    state.global_data = res;
  }
};

export default mutations;
