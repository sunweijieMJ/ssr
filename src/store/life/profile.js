import LifeApi from '../../api/life/Life';
import user_photo_default from '../../../static/app/img/personal_default_bg.png';

export default {
  namespaced: true,
  actions: {
    async getUserInfo({commit}, id) {
      await LifeApi().getUserInfo(id).then(res => {
        if (res.status) commit('PROFILE_INFO', res.data);
      });
    },
    async getUserDynamic({commit, state}, id) {
      await LifeApi().getUserDynamic(id, state.pageInfo.current_page).then(res => {
        if (res.status) commit('PROFILE_DYNAMIC', res.data);
      });
    }
  },
  mutations: {
    PROFILE_INFO: (state, res) => {
      if(res.status) {
        state.user_info = res;
        state.user_photo = res.user_photo;
        if (res.background_img) state.user_bg = res.user_bg_url;
      }
    },
    PROFILE_DYNAMIC: (state, res) => {
      console.log(res);
    }
  },
  state: () => ({
    user_info: null, // ETC 用户信息
    user_photo: '', // ETC 用户个人头像
    user_bg: user_photo_default, // ETC  用户背景图片

    user_dynamic: null, // ETC 个人动态
    pageInfo: {
      current_page: 0, // ETC 当前页
      page_total: 0 // ETC 总页数
    },
    loadInfo: {
      loading: false, // ETC 是否loading
      noMore: false // ETC 是否到底
    }
  })
};
