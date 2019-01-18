import fetch from 'create-api';
import {os} from '../../utils/business/judge.js';

class Personal {
  constructor() {
    this.$api = fetch;
  }

  /**
   * 获取全部食品
   * @param content_id 内容id
   * @param lh_authinfo 加密后的用户id
   */
  getInvited(data) {
    return this.$api.get('/user_invite_share_detail', data);
  }

  /**
   * 发送验证码
   * @param {num} mobile 手机号
   * @param {number} country_num 区号
   */
  getIdentify(data){
    return this.$api.get('/validate_code', data);
  }

  /**
   * 登陆
   * @param {num} mobile
   * @param {num} code
   * @param {num} country_num
   */
  getLogin(data){
    return this.$api.post(`/dynamic_login?app=${os().isiPhone ? 'i' : 'a'}-lanehub&version=3.0`, data);
  }

  /**
   * 会员领取结果
   * @param {num} mobile  // 手机号
   * @param {num} country_num // 区号
   */
  getResult(data){
    return this.$api.post('/user_draw_rights', data);
  }
  /**
   * 获取logo
   */
  getLogo(data){
    return this.$api.get('/logo', data);
  }

  /**
   * 领取优惠券
   * @param {string} ticket 券的加密信息
   */
  getCoupon(data){
    return this.$api.get('/asset/scan/ticket', data);
  }

  /**
   * 立即领取优惠券
   * @param {string} ticket：//券的加密信息
   * @param {string} mobile //手机号
   * @param {string} country_num //城市编码
   * @param {string} code //验证码
   */
  getCouponResult(data){
    return this.$api.get('/asset/scan/ticket', data);
  }
}

// 单列模式返回对象
let instance;
export default () => {
  if (instance) return instance;
  instance = new Personal();
  return instance;
};
