import fetch from 'create-api';

class Product {
  constructor() {
    this.$api = fetch;
  }

  /**
   * 根据ID 获取动态id
   * @param {int} dynamicId
   */
  getProductDescriptionById(id) {
    return this.$api.get('/mall/product/description/', {product_id: id});
  }
}
// 单列模式返回对象
let instance;
export default () => {
  if (instance) return instance;
  instance = new Product();
  return instance;
};
/*
 * export default {
 *   getProductDescriptionById
 * };
 */
