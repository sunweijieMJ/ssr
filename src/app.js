import Vue from 'vue';
import {sync} from 'vuex-router-sync';
import App from './App.vue';

// 按需引入mint-ui组件
import {Toast, Popup, InfiniteScroll, Lazyload} from 'mint-ui';
Vue.prototype.$toast = Toast;
Vue.component(Popup.name, Popup);
Vue.use(InfiniteScroll);
Vue.use(Lazyload);

// 全局注册自定义的过滤器
import filters from './utils/filters/index';
for (let key in filters) {
  Vue.filter(key, (...val) => {
    return filters[key](...val);
  });
}

import {createStore} from './store';
import {createRouter} from './router';
import title from './mixins/title';
import meta from './mixins/meta';

Vue.mixin(title);
Vue.mixin(meta);

export function createApp() {
  const store = createStore();
  const router = createRouter();

  sync(store, router);

  const app = new Vue({
    router,
    store,
    render: h => h(App)
  });

  return {app, router, store};
}
