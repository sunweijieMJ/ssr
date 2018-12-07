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
    this.isTencent = os(global.userAgent).isWechat || os(global.userAgent).isQQ;
  }
};
