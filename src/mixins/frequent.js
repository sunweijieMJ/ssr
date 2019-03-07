import {os, appRoute} from '../utils/business/judge';
import {warning} from '../utils/business/tools';
import linsign from '../utils/signFun';

export default {
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
    // query形式原生跳转
    queryAssign(name, data) {
      if (window.location.pathname.slice(1) === name) return;
      window.location.assign(`/${name}?${linsign.urlConcat(data)}`);
    },
    // location刷新跳转
    assign(name, id) {
      if (window.location.pathname === `/${name}${id ? `/${id}` : ''}`) return;
      window.location.assign(`/${name}${id ? `/${id}` : ''}`);
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
      } else if ((os().isWechat || os().isQQ)) {
        const path = window.location.href.split(window.location.origin)[1];
        this.$router.push({name: 'AppLink', query: {path}});
        return;
      }

      // 判断对应的app跳转地址
      const current_url = appRoute(that.$route.name, that.$route.params.id, that.$route.query);

      // 普通浏览器
      if (os().isiPhone) {
        window.location.href = current_url;
      } else if (os().isAndroid || window.navigator.userAgent === 'okhttp/3.9.1') {
        window.location.href = current_url;
        setTimeout(() => {
          window.location.href = 'https://download.lanehub.cn/android?channel=a2';
        }, 2000);
      } else {
        warning('iPhone,Android之外手机不支持', 3000);
      }
    }
  }
};
