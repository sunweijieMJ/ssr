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

import UserActions from './utils/business/actions';

export function createApp() {
  const store = createStore();
  const router = createRouter();

  // 全局守卫
  router.afterEach((to, from) => {
    if (process.env.VUE_ENV === 'client') {
      if (from.name) UserActions().leave(from.name);
      if (to.name) UserActions().entry(to.name);
    }
  });

  sync(store, router);

  const app = new Vue({
    router,
    store,
    render: h => h(App)
  });

  return {app, router, store};
}
