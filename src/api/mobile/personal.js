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
    if(os().isAndroid) {
      return this.$api.post('/dynamic_login?app=a-lanehub&version=3.0', data);
    } else if(os().isiPhone) {
      return this.$api.post('/dynamic_login?app=i-lanehub&version=3.0', data);
    }
  }

  /**
   * 会员领取结果
   * @param {num} mobile  // 手机号
   * @param {num} country_num // 区号
   */
  getResult(data){
    return this.$api.post('/user_draw_rights', data);
  }
}

// 单列模式返回对象
let instance;
export default () => {
  if (instance) return instance;
  instance = new Personal();
  return instance;
};
