import MallApi from '../../api/mobile/mall';
import PersonalApi from '../../api/mobile/personal';
export default {
  namespaced: true,
  actions: {
    async getProductList({commit, state}, data) {
      state.startime = Date.now();
      if(state.curTime && 500 > (state.curTime - state.startime)){
        state.curTime = null;
        return;
      }else{
        state.curTime = Date.now();
        if (state.loadInfo.loading && state.loadInfo.noMore) return;
        commit('CHANGE_LOADING', true);
        await MallApi().getProList({sort_id: data.sort_id ? data.sort_id : '', category_id: data.id, keyword: data.key ? data.key : '', page: ++state.pageInfo.current_page, with_dynamics: 0, with_option_skus: 0, with_option_stocks: 1, with_options: 1, with_params: 0, with_specs: 0}).then(res => {
          if (res.data) commit('PRODUCT_LIST', res.data);
        });
      }
    },
    async getProductList2({commit, state}, data) {
      await MallApi().getProList({sort_id: data.sort_id ? data.sort_id : '', keyword: data.key, category_id: data.id, page: 1, with_dynamics: 0, with_option_skus: 0, with_option_stocks: 1, with_options: 1, with_params: 0, with_specs: 0}).then(res => {
        if (res.data) commit('PRODUCT_LIST2', res.data);
      });
    },
    async getCategoryList({commit}) {
      await MallApi().getCategoryList({category_id: 0, children_level: 2}).then(res => {
        if (res.data) commit('CATEGRAY_LIST', res.data);
      });
    },
    async getHot({commit}) {
      await MallApi().getHotList().then(res => {
        if (res.data) commit('HoT_LIST', res.data);
      });
    },
    async getHistory({commit}) {
      await MallApi().getHistoryList().then(res => {

        if (res.data) commit('HISTORY_LIST', res.data);
      });
    },
    async getThinkList({commit}, keys) {
      await MallApi().getThinkList({keyword: keys}).then(res => {
        if (res.data) commit('THINK_LIST', res.data);
      });
    },
    // logo
    async getLogo({commit}, data) {
      await PersonalApi().getLogo(data).then(res => {
        if (res.status) commit('LOGO', res);
      });
    },
    tabChange: ({commit}, data) => {
      commit('TAB_CHANGE', data);
    }
  },
  mutations: {
    PRODUCT_LIST: (state, res) => {
      if(state.list.length){
        if(res.data.length){
          if(+res.data[0].id === +state.list[0].id){

          }else{
            state.list = state.list.concat(res.data);
          }
        }
      }else{
        state.list = state.list.concat(res.data);
      }
      state.pageInfo.page_total = res.last_page;
      // 触底判断
      state.loadInfo.loading = false;
      if (state.pageInfo.current_page >= state.pageInfo.page_total || !state.list.length) {
        state.loadInfo.loading = true;
        state.loadInfo.noMore = true;
      }
    },
    PRODUCT_LIST2: (state, res) => {
      state.list = [];
      state.list = res.data;
      state.pageInfo.page_total = res.last_page;
      state.pageInfo.current_page = 1;
      state.loadInfo.loading = false;
      if (state.pageInfo.current_page >= state.pageInfo.page_total || !state.list.length) {
        state.loadInfo.loading = true;
        state.loadInfo.noMore = true;
      }
    },
    CHANGE_LOADING: (state, res) => {
      state.loadInfo.loading = res;
    },
    CATEGRAY_LIST: (state, res) => {
      state.categray_list = res;
    },
    HoT_LIST: (state, res) => {
      state.hotlist = res;
    },
    HISTORY_LIST: (state, res) => {
      state.history = res;
    },
    THINK_LIST: (state, res) => {
      state.thinklist = res;
    },
    TAB_CHANGE: (state, res) => {
      state.loadInfo.noMore = res;
    },
    LOGO: (state, res) => {
      state.logo = res.data.logo;
    }
  },
  state: () => ({
    startime: null,
    curTime: null,
    list: [],
    categray_list: '',
    pageInfo: {
      current_page: 0, // ETC 当前页
      page_total: 0 // ETC 总页数
    },
    loadInfo: {
      loading: false, // ETC 是否loading
      noMore: false // ETC 是否到底
    },
    hotlist: '',
    history: '',
    thinklist: '',
    logo: '' // ETC LOGO
  })
};
