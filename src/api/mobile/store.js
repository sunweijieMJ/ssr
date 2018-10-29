import fetch from 'create-api';

class Store {
  constructor() {
    this.$api = fetch;
  }

  /**
   * 获取全部食品
   * @param store_id 食品id
   */
  getFoodList(store_id) {
    return this.$api.get('/mall/diet/menu', {store_id});
  }

  /**
   * 获取食品详情
   * @param product_id 食品id
   * @param brick_id 实体店id
   * @param with_basic 是否包括商品的基本信息
   * @param with_options 是否附带MSU信息
   * @param with_specs 是否附带规格名称及其值
   * @param with_joyful 是否包括愉悦度信息
   */
  getFoodDetail(data) {
    return this.$api.get('/mall/diet/info', data);
  }

  // 店铺详情
  getStoreDetail(data){
    return this.$api.get('mall/brickstore/info', data);
  }

  // 店铺列表
  getStoreList(){
    return this.$api.get('/mall/brickstore/list', {});
  }
}

// 单列模式返回对象
let instance;
export default () => {
  if (instance) return instance;
  instance = new Store();
  return instance;
};
