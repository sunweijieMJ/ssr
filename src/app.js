import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import App from './App.vue'
import { createStore } from './store'
import { createRouter } from './router'
import title from './mixins/title'

Vue.mixin(title);


export function createApp() {
  const store = createStore();
  const router = createRouter()
  
  sync(store, router);

  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })

  return { app, router, store }
}
