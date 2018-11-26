import fetch from 'create-api';

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
   * @param {num} country_num 区号
   */
  getIdentify(data){
    return this.$api.get('/login/regiseter_code', data);
  }

  /**
   * 登陆
   * @param {num} mobile
   * @param {num} code
   * @param {num} country_num
   */
  getLogin(data){
    return this.$api.post('/dynamic_login', data);
  }
}

// 单列模式返回对象
let instance;
export default () => {
  if (instance) return instance;
  instance = new Personal();
  return instance;
};
