import LifeApi from '../../api/life/Life';

export default{
  namespaced: true,
  state: () => ({
    topic_detail: '', // ETC 话题详情
    entity_list: [], // ETC 评论列表
    current_page: 0, // ETC 当前页码
    page_total: '', // ETC 总页数
    loading: false, // ETC 加载中
    no_more: false // ETC 触底
  }),
  actions: {
    async topicDetail({commit}, data) {
      await LifeApi().getTopicDetail(data).then(res => {
        commit('TOPIC_DETAIL', res.data);
      });
    },
    async topicList({commit, state}, id) {
      await LifeApi().getTopicList({entity_type: 3, entity_id: id, page: ++state.current_page}).then(res => {
        commit('TOPIC_LIST', res.data);
      });
    },
  },
  mutations: {
    TOPIC_DETAIL: (state, res) => {
      state.topic_detail = res;
    },
    TOPIC_LIST: (state, res) => {
      state.page_total = res.page_total || 0;
      if (state.entity_list) {
        state.entity_list = state.entity_list.concat(res.data);
      } else {
        state.entity_list = res.data;
      }
      // 触底判断
      state.loading = false;
      if (state.current_page >= state.page_total || !state.entity_list.length) {
        state.loading = true;
        state.no_more = true;
      }
      console.log(res)
    },
  },
};