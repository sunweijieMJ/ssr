import fetch from 'create-api';

class Tool {
  constructor() {
    this.$api = fetch;
  }

  /**
   * 全局对象
   */
  getGlobal() {
    return this.$api.get('config/global', {});
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

  /**
   * 获取国家码
   */
  getCountryCode() {
    return this.$api.get('/get_country_num_list', {});
  }

  /**
   * 数据埋点
   * @param {array} actions
   * http://git.release.weiheinc.com/joe/api-doc/blob/master/Infrastracture/LanehubDataRequest.md
   */
  sendUserAction(data) {
    return this.$api.post('/user_action_log?app=m-lanehub', data);
  }

}

// 单列模式返回对象
let instance;
export default () => {
  if (instance) return instance;
  instance = new Tool();
  return instance;
};
