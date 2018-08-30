import {os, appRoute} from '../utils/business/judge';
import {warning} from '../utils/business/tools';

export default {
  data() {
    return {
      current_url: ''
    };
  },
  methods: {
    // 返回
    back() {
      this.$router.back();
    },
    // query传值
    querySkip(name, data) {
      this.$router.push({name, query: data});
    },
    // params传值
    paramsSkip(name, data) {
      this.$router.push({name, params: data});
    },
    // 大图展示
    showImage(data, index) {
      this.$store.dispatch('setImagePopup', {status: true, active: index, source: data});
    },
    // 拦截
    intercept() {
      let that = this;
      // pc端打开
      if (os().isDeskTop) {
        warning('请在移动端打开或去下载app', 3000);
        return;
        // 微信浏览器
      } else if (os().isWechat) {
        window.location.href = 'https://a.app.qq.com/o/simple.jsp?pkgname=com.weihe.myhome';
        return;
      }

      // 判断对应的app跳转地址
      appRoute(that.$route.name, that.$route.params.id);

      // 普通浏览器
      if (os().isiPhone) {
        window.location.href = that.current_url;
      } else if (os().isAndroid || window.navigator.userAgent === 'okhttp/3.9.1') {
        window.location.href = that.current_url;
      } else {
        warning('iPhone,Android之外手机不支持', 3000);
      }
    }
  }
};
