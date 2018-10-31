import fetch from 'create-api';

class Mall {
  constructor() {
    this.$api = fetch;
  }

  /**
   * 商品详情
   * @param product_id 商品id
   * @param with_specs
   * @param with_params
   * @param with_options
   * @param with_option_skus
   * @param with_option_stocks
   * @param with_dynamics
   * @param with_shops
   * @param with_cart_quantity
   */
  getProductDetail(data) {
    return this.$api.get('mall/product/info', data);
  }

  /**
   * 买家秀动态
   * @param product_id 商品id
   * @param page
   */
  getProductDynamic(product_id, page) {
    return this.$api.get('/mall/product/dynamic/list', {product_id, page});
  }

  /**
   * 商城列表
   */
  getProList(data) {
    return this.$api.get('/mall/product/list', data);
  }

  /**
   * 新手礼包
   */
  getNewUserGift() {
    return this.$api.get('new_user_gift', {});
  }

  // 分类列表
  getCategrayList(data){
    return this.$api.get('mall/category/list', data);
  }

  /**
   * 商品单页推荐商品
   */
  getDetailRecommend(product_id) {
    return this.$api.get('/mall/misc/relative', {product_id});
  }

  // 热搜名单
  getHotList(){
    return this.$api.get('/mall/misc/hot', {});
  }

  // 商品搜索历史
  getHistoryList(){
    return this.$api.get('mall/misc/search_history', {});
  }

  // 联想商品列表
  getThinkList(data){
    return this.$api.get('mall/misc/hint', data);

  }
}

// 单列模式返回对象
let instance;
export default () => {
  if (instance) return instance;
  instance = new Mall();
  return instance;
};
