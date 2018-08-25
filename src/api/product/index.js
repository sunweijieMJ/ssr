import fetch from 'create-api';

function myfetch(url, params) {
  return fetch({
    url,
    params
  });
}
/**
 * 根据ID 获取动态id
 * @param {int} dynamicId
 */
function getProductDescriptionById(id) {
  return myfetch('/mall/product/description/', {product_id: id}).then(res => {
    return res;
  }).catch((error) => {
    console.log(error);
  });
}

export default {
  getProductDescriptionById
};
