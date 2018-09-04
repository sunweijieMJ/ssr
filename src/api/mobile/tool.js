import fetch from 'create-api';

class Tool {
  constructor() {
    this.$api = fetch;
  }

  /**
   * 全局对象
   */
  getGlobal() {
    return this.$api.post('config/global', {});
  }

  /**
   * 查询用户id
   * @param user_name 用户名
   */
  getUserId(user_name) {
    return this.$api.get('users/ait_find_username', {user_name});
  }

  /**
   * 微信分享初始化
   * @param url
   */
  wxInit(url) {
    return this.$api.get('/wechat/pub/get_jsapiticket', {url});
  }

}

// 单列模式返回对象
let instance;
export default () => {
  if (instance) return instance;
  instance = new Tool();
  return instance;
};
