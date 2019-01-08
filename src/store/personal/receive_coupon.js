import PersonalApi from '../../api/mobile/personal';

export default {
  namespaced: true,
  actions: {
    // 卡券详情
    async getCoupon({commit}, data) {
      await PersonalApi().getCoupon(data).then(res => {
        if (res.status) commit('COUPON', res.data);
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
        // console.log(res)
        if (res.status) commit('COUPON_RESULT', res.data);
      });
    }
  },
  mutations: {
    COUPON: (state, res) => {
      state.coupon_for = res;
    },
    COUPON_RESULT: (state, res) => {
      console.log(res)
      state.state = res.status;
    },
    INDENTIFY: () => {
      // state.data = res;
    }
  },
  state: () => ({
    coupon_for: '',
    state: ''
  })
};
