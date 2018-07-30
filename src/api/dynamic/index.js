//import Abstract from '../Abstract';
import fetch from 'create-api';

function myfetch(url, params) {
  return fetch({
    url: url,
    params: params
  });
}
/**
 * 根据ID 获取动态id
 * @param {int} dynamicId 
 */
function getDynamicById(dynamicId) {
  return myfetch('/content/moment_detail?entity_id=31986&__platrform=m&sign=60f063dfb94173ad7b6d1e9605bec6bb', {}).then( res => {
    return res;
  }).catch((error) => {
      console.log(error)
  })
}

export default {
  getDynamicById
}

// class Dynamic extends Abstract {

//   constructor() {
//     super();
//   }

//   fetch(url, params) {
//     return this.$api.fetch({
//       url: url,
//       params: params
//     });
//   }
//   /**
//    * 根据ID 获取动态id
//    * @param {int} dynamicId 
//    */
//   getDynamicById(dynamicId) {
//     let obj = this.$api.fetch({});
//     return {obj, bb:'dd'};
//     return this.fetch('/content/moment_detail?entity_id=31986&__platrform=m&sign=60f063dfb94173ad7b6d1e9605bec6bb').then( res => {
//       return res.data;
//     });
//   }
// }

// let instance;
// export default function instance() {
//   if (instance) {
//     return instance;
//   }
//   instance = new Dynamic();
//   return instance;
// }