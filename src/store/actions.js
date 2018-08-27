// 将types.js里的内容存为types对象
import * as types from './types';
import dynamic from '../api/dynamic';
import LifeApi from '../api/life/Life';

const actions = {
  async getCommentsList({ commit, state }, id) {
    commit('CHANGE_LOADING', true);
    await LifeApi().getCommentsList({ entity_id: id, entity_type: 6, page: ++state.pageInfo.current_page }).then(res => {
      if (res.status) commit('COMMENT_LIST', res.data);
    });
  },
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
