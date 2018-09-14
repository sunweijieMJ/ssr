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
  getProductDetail({product_id, with_specs, with_params, with_options, with_option_skus, with_option_stocks, with_dynamics, with_dynamics_id, with_shops, with_cart_quantity}) {
    return this.$api.get('mall/product/info', {product_id, with_specs, with_params, with_options, with_option_skus, with_option_stocks, with_dynamics, with_dynamics_id, with_shops, with_cart_quantity});
  }

  /**
   * 买家秀动态
   * @param product_id 商品id
   * @param page
   */
  getProductDynamic(product_id, page) {
    return this.$api.get('/mall/product/dynamic/list', {product_id, page});
  }

}

// 单列模式返回对象
let instance;
export default () => {
  if (instance) return instance;
  instance = new Mall();
  return instance;
};
