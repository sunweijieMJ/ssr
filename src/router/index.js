import Vue from 'vue';
import Router from 'vue-router';
import mobilerouter from './mobile';
import webrouter from './web';
import approuter from './app';

Vue.use(Router);

export function createRouter() {
  let siteTyperouter = global.siteType === 'app' ?
    approuter : global.siteType === 'web' ? webrouter : mobilerouter;
  return new Router({
    mode: 'history',
    scrollBehavior: () => ({y: 0}),
    routes: siteTyperouter
  });
}
