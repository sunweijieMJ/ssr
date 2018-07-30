import Vue from 'vue'
import Router from 'vue-router'
import mobilerouter from './mobile'
import webrouter from './web'
import approuter from './app'

Vue.use(Router)

export function createRouter() {
  let siteType = global.siteType;
  // if(process.env.VUE_ENV == 'client') {
  //   console.log("dddxx", global, global.siteType);
  //   _global= Vue.prototype.GLOBAL;
  // } else {
  //   _global = global;
  // }

  let siteTyperouter = siteType === 'app' ? 
    approuter : siteType === 'web' ? webrouter : mobilerouter;
  return new Router({
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes: siteTyperouter
  });
}
