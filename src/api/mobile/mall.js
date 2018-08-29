import fetch from 'create-api';

class Mall {
  constructor() {
    this.$api = fetch;
  }

  /**
   * 查询用户id
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
  getProductDetail({product_id, with_specs = 1, with_params = 1, with_options = 1, with_option_skus = 1, with_option_stocks = 1, with_dynamics = 1, with_shops = 1, with_cart_quantity = 1}) {
    return this.$api.get('mall/product/info', {product_id, with_specs, with_params, with_options, with_option_skus, with_option_stocks, with_dynamics, with_shops, with_cart_quantity});
  }

}

// 单列模式返回对象
let instance;
export default () => {
  if (instance) return instance;
  instance = new Mall();
  return instance;
};