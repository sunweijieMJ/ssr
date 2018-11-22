import fetch from 'create-api';

class Personal {
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

}

// 单列模式返回对象
let instance;
export default () => {
  if (instance) return instance;
  instance = new Personal();
  return instance;
};
