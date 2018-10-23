import fetch from 'create-api';

class Store {
  constructor() {
    this.$api = fetch;
  }

  /**
   * 获取食品详情
   */
  getFoodDetail() {
    return this.$api.post('config/global', {});
  }

}

// 单列模式返回对象
let instance;
export default () => {
  if (instance) return instance;
  instance = new Store();
  return instance;
};
