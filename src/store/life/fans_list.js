import LifeApi from '../../api/mobile/life';

export default{
  namespaced: true,
  state: () => ({
    page_title: '',
    fans: [],
    current_page: 0, // ETC 当前页
    page_total: '', // ETC 总页数
    loading: false, // ETC 加载中
    no_more: false // ETC 触底
  }),
  actions: {
    async fansList({commit, state}, id) {
      await LifeApi().getAttentionList({user_id: id, curpage: ++state.current_page, funs: 1}).then(res => {
        commit('FANS_LIST', res.data);
      });
    }
  },
  mutations: {
    FANS_LIST: (state, res) => {
      state.page_total = res.last_page || 0;
      if (state.fans) {
        state.fans = state.fans.concat(res.data);
      } else {
        state.fans = res.data;
      }
      // 触底判断
      state.loading = false;
      if (state.current_page >= state.page_total || !state.fans.length) {
        state.loading = true;
        state.no_more = true;
      }
    }
  }
};
