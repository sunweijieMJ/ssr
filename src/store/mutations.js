// 将types.js里的内容存为types对象
import * as types from './types';

const mutations = {
  UPDATE_DYNAMIC: (state, data) => {
    state.dynamic = {...data};
  },
  [types.SHOW_IMAGE]: (state, data) => {
    state.ImagePopup = data;
  }
};

export default mutations;
