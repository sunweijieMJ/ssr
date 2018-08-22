import Abstract from './Abstract';

class Business extends Abstract {

  constructor() {
    super();
  }

  /**
   * 格式化返回数据
   * @param data
   * @returns Object
   */
  __resDataFormat(data) {
    if (data.code === '00006') {
      return data.data;
    } else {
      return {state: true, message: data.message};
    }
  }

  /**
   * 查询用户id
   * @param user_name 用户名
   */
  getUserId(user_name) {
    let that = this;
    return new Promise((resolve) => {
      this.$api.get('users/ait_find_username', {user_name}, res => {
        resolve(that.__resDataFormat(res));
      });
    });
  }
}

// 单列模式返回对象
let instance;
export default () => {
  if (instance) return instance;
  instance = new Business();
  return instance;
};
