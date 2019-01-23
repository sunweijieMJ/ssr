import fetch from 'create-api';

class Embed {
  constructor() {
    this.$api = fetch;
  }

  /**
   * 获取商品描述
   * @param {number | required} product_id
   */
  getProductDesc(id) {
    return this.$api.get('/mall/product/description/', {product_id: id});
  }

  /**
   * 获取活动描述
   * @param {number | required} activity_id
   */
  getActivityDesc(id) {
    return this.$api.get('/content/activity/description', {activity_id: id});
  }

}

// 单列模式返回对象
let instance;
export default () => {
  if (instance) return instance;
  instance = new Embed();
  return instance;
};
