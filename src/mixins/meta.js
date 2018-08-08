function getMeta(vm) {
  const {meta} = vm.$options;
  if (meta) {
    return typeof meta === 'function' ?
      meta.call(vm) :
      meta;
  }
  return false;
}

const serverMetaMixin = {
  created() {
    let meta = getMeta(this);
    if (meta) {
      let constant = require('../config/constant');
      let mixMeta = global.siteType === constant.siteWeb ? constant.pcMeta : constant.mMeta;
      this.$ssrContext.meta = mixMeta + meta;
    }
  }
};

const clientMetaMixin = {
  mounted() {
    let meta = getMeta(this);
    if (meta) {
      let constant = require('../config/constant');
      let mixMeta = global.siteType === constant.siteWeb ? constant.pcMeta : constant.mMeta;
      document.meta = mixMeta + meta;
    }
  }
};

export default process.env.VUE_ENV === 'server' ?
  serverMetaMixin :
  clientMetaMixin;
