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
    // location刷新跳转
    assign(name, id) {
      if (window.location.pathname === `/${name}/${id}`) return;
      window.location.assign(`/${name}/${id}`);
    },
    // 大图展示
    showImage(data, index) {
      this.$store.dispatch('setImagePopup', {status: true, active: index, source: data});
    },
    // 阻止冒泡及默认行为
    prevent(e) {
      e.stopPropagation ? e.stopPropagation() : window.event.cancelBubble = true;
      e.preventDefault ? e.preventDefault() : window.event.returnValue = false;
    }
  }
};
