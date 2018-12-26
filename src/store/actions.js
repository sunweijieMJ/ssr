// 将types.js里的内容存为types对象
import * as types from './types';
import ToolApi from '../api/mobile/tools';

const actions = {
  setImagePopup: ({commit}, data) => {
    if (data.hasOwnProperty('status')) {
      commit(types.SHOW_IMAGE, data);
    } else {
      commit(types.CHANGE_INDEX, data);
    }
  },
  setLinkPopup: ({commit}, data) => {
    commit(types.APP_LINK, data);
  },
  async getGlobal({commit}) {
    await ToolApi().getGlobal().then(res => {
      if (res.status) commit(types.GLOBAL_DATA, res.data);
    });
  }
};

export default actions;
