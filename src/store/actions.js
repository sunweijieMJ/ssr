import dynamic from '../api/dynamic';

const getcommonDynamic = ({commit}) => {
  return dynamic.getDynamicById(123).then((res) => {
    commit('UPDATE_DYNAMIC', res.data);
  });
};

export default {
  getcommonDynamic
};
