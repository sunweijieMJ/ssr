import {os} from '../utils/business/judge.js';

export default {
  data() {
    return {
      response: {},
      isTencent: false
    };
  },
  created() {
    let that = this;
    that.response = that.$route.query;
    if (process.env.VUE_ENV === 'client') {
      this.isTencent = os().isWechat || os().isQQ;
    }
  }
};
