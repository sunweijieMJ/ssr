// 将types.js里的内容存为types对象
import * as types from './types';
import dynamic from '../api/dynamic';

const actions = {
  getcommonDynamic: ({commit}) => {
    return dynamic.getDynamicById(123).then((res) => {
      commit('UPDATE_DYNAMIC', res.data);
    });
  },
  setImagePopup: ({commit}, data) => {
    commit(types.SHOW_IMAGE, data);
  }
};

export default actions;
