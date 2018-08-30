// 将types.js里的内容存为types对象
import * as types from './types';
import LifeApi from '../api/mobile/life';

const actions = {
  setImagePopup: ({commit}, data) => {
    commit(types.SHOW_IMAGE, data);
  },
  async getGlobal({commit}) {
    await LifeApi().getGlobal().then(res => {
      if (res.status) commit(types.GLOBAL_DATA, res.data);
    });
  }
};

export default actions;
