import fetch from 'create-api';

class Mall {
  constructor() {
    this.$api = fetch;
  }

  /**
   * 商品详情
   * @param {number | required} product_id 商品id
   * @param {boolean} with_specs 附带规格名称及其值
   * @param {boolean} with_params 附带商品参数
   * @param {boolean} with_options 是否附带MSU信息
   * @param {boolean} with_option_skus 是否附带MSU的SKU组成
   * @param {boolean} with_option_stocks 是否进一步检查options的可用库存
   * @param {boolean} with_dynamics 是否附带商品关联的动态
   * @param {boolean} with_dynamics_id with_dynamics参数只返回id
   * @param {boolean} with_shops 该商品在哪些店铺售卖
   * @param {boolean} with_cart_quantity 是否附带购物车中的商品数量
   * @param {boolean} with_basic 是否包括商品的基本信息
   * @param {boolean} with_service 是否包括服务信息
   * @param {boolean} with_joyful 是否包括愉悦度信息
   */
  getProductDetail(data) {
    return this.$api.get('mall/product/info', data);
  }

  /**
   * 买家秀动态
   * @param {number | required} product_id 商品id
   * @param {number} page
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
  getCategoryList(data){
    return this.$api.get('mall/category/list', data);
  }

  /**
   * 商品单页推荐商品
   * @param product_id 商品id
   */
  getDetailRecommend(product_id) {
    return this.$api.get('/mall/misc/relative', {product_id});
  }

  // 热搜名单
  getHotList(){
    return this.$api.get('/mall/misc/hot', {});
  }

  // 商品搜索历史(暂不支持未登陆)
  getHistoryList(){
    return this.$api.get('mall/misc/search_history', {});
  }

  /**
   * 联想商品列表
   * @param {string | required} keyword 搜索关键字
   */
  getThinkList(data){
    return this.$api.get('mall/misc/hint', data);
  }

  /**
   * 人工榜单
   * @param {num} module_id  榜单id
   */
  getNewProduct(data){
    return this.$api.get('mall/product/manual_module_detail', data);
  }

  /**
   * 自动榜单
   * @param {num} type 榜单类型
   */
  getAutoNewProduct(data){
    return this.$api.get('mall/product/auto_module_detail', data);
  }

  /**
   * 陈列码列表
   * @param text 待查文本,应用此文本进行 urlencode 处理
   * @param type 扫码类型,0前台未知(交由后端自主解释),1商品条码(12或13位),2SKU序列码(8位),3陈列码
   */
  getExhibitList(data) {
    return this.$api.get('/mall/misc/scan', data);
  }

  /**
   * 商城列表
   */
  getMallList(data) {
    return this.$api.get('/mall/product/get_product_list', data);
  }

  /**
   * 人工榜单列表
   */
  getManualModuleList(data) {
    return this.$api.get('/mall/product/product_list_artificial', data);
  }
}

// 单列模式返回对象
let instance;
export default () => {
  if (instance) return instance;
  instance = new Mall();
  return instance;
};
