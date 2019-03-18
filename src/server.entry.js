import {createApp} from './app';
import createRequest from './utils/request';

export default context => new Promise((resolve, reject) => {
  const {app, router, store} = createApp();
  // 初始化 vuex state 值

  store.replaceState({
    image_popup: { // ETC 大图展示弹框显隐
      status: false,
      active: 0,
      source: []
    },
    global_data: ''
  });

  const {url} = context;
  const {fullPath} = router.resolve(url).route;
  if (url !== fullPath) {
    reject({url: fullPath});
  }
  // set router's location
  router.push(url);
  const request = createRequest();
  request.setSiteType(context.siteType);
  request.setOsType(context.osType);
  request.setAppType(context.appType);

  // wait until router has resolved possible async hooks
  router.onReady(() => {
    const matchedComponents = router.getMatchedComponents();
    // no matched routes
    if (!matchedComponents.length) {
      reject({code: 404});
    }
    Promise.all(matchedComponents.map((component) => {
      if (component.asyncData) {
        return component.asyncData({
          store,
          route: router.currentRoute
        });
      }
    })).then(() => {
      store.state.siteType = global.siteType;
      context.state = store.state;
      resolve(app);
    }).catch(reject);
  }, reject);
});
