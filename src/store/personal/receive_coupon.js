import PersonalApi from '../../api/mobile/personal';

export default {
  namespaced: true,
  actions: {
    // 卡券详情
    async getCoupon({commit}, data) {
      await PersonalApi().getCoupon(data).then(res => {
        if (res.data) commit('COUPON', res);
      });
    },
    // 发送验证码
    async getIdentify({commit}, data) {
      await PersonalApi().getIdentify(data).then(res => {
        if (res.status) commit('INDENTIFY', res.data);
      });
    },

    async getCouponResult({commit}, data) {
      await PersonalApi().getCouponResult(data).then(res => {
        if (res.data) commit('COUPON_RESULT', res);
      });
    }
  },
  mutations: {
    COUPON: (state, res) => {
      state.coupon_for = res.data || '';
      if(!res.status){
        state.view_status = 0;
      }
    },
    COUPON_RESULT: (state, res) => {
      state.state = res.data.status;
      state.result_state = res.status;
    },
    INDENTIFY: () => {
      // state.data = res;
    }
  },
  state: () => ({
    view_status: 1,
    coupon_for: '',
    state: '',
    result_state: ''
  })
};
