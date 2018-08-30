import LifeApi from '../../api/mobile/life';

export default{
  namespaced: true,
  state: () => ({
    thumb_list: [],
    current_page: 0, // ETC 当前页
    page_total: '', // ETC 总页数
    total: '', // ETC 总数
    loading: false, // ETC 加载中
    no_more: false // ETC 触底
  }),
  actions: {
    async thumbUpList({commit, state}, id) {
      state.loading = true;
      await LifeApi().getThunmbUpList({entity_id: id, entity_type: 1, page: ++state.current_page}).then(res => {
        commit('THUMB_UP_LIST', res.data);
      });
    }
  },
  mutations: {
    THUMB_UP_LIST: (state, res) => {
      state.page_total = res.lastPage || 0;
      if (state.thumb_list) {
        state.thumb_list = state.thumb_list.concat(res.items);
      } else {
        state.thumb_list = res.items;
      }
      // 触底判断
      state.loading = false;
      if ((state.current_page >= state.page_total) || !state.thumb_list.length) {
        state.loading = true;
        state.no_more = true;
      }
    }
  }
};
