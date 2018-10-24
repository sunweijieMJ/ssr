import fetch from 'create-api';

class Store {
  constructor() {
    this.$api = fetch;
  }

  /**
   * 获取食品类目
   * @param brick_id 实体店id
   * @param category_id 0表示根分类, 其它值表示具体的分类
   * @param children_level 获取子分类的级别(默认为1), 0不表示不获取子分类, 1表示只获取当前分类的一级子分类, -1表示获取所有子类分类
   */
  getCategoryList(data) {
    return this.$api.get('/mall/diet/categories', data);
  }

  /**
   * 获取食品列表
   * @param brick_id 实体店id
   * @param page 当前页
   * @param page_size 页码数
   * @param with_specs 附带规格名称及其值
   * @param with_options 是否附带MSU信息
   * @param category_id 分类id, 默认使用0(根分类下)
   * @param keyword 关键字
   */
  getFoodList(data) {
    return this.$api.get('/mall/diet/list', data);
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

}

// 单列模式返回对象
let instance;
export default () => {
  if (instance) return instance;
  instance = new Store();
  return instance;
};
