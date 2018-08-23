import Abstract from '../Abstract';

class Life extends Abstract {

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

  /**
   * 关注列表
   * @param created_at
   * @param feed_type
   */
  getFocusList(created_at, feed_type) {
    let that = this;
    return new Promise(resolve => {
      that.$api.get('/user/personalize', {created_at, feed_type}, res => {
        resolve(that.__resDataFormat(res));
      });
    });
  }

  /**
   * 置顶列表
   */
  getStickList() {
    let that = this;
    return new Promise(resolve => {
      that.$api.get('content/content_top', {}, res => {
        resolve(that.__resDataFormat(res));
      });
    });
  }

  /**
   * 热门话题
   */
  getHotTopicList() {
    let that = this;
    return new Promise(resolve => {
      that.$api.get('/hot_topic_list', {}, res => {
        resolve(that.__resDataFormat(res));
      });
    });
  }

  /**
   * 动态列表
   * @param page
   */
  getMomentList(page) {
    let that = this;
    return new Promise(resolve => {
      that.$api.get('content/dynamic_list', {page}, res => {
        resolve(that.__resDataFormat(res));
      });
    });
  }

  /**
   * 动态详情
   * @param entity_id
   * @param entity_type
   * @param page
   */
  getMomentDetail(entity_id) {
    let that = this;
    return new Promise((resolve) => {
      this.$api.get('content/moment_detail', {entity_id}, res => {
        resolve(that.__resDataFormat(res));
      });
    });
  }

  /**
   * 评论列表
   * @param entity_id
   * @param entity_type
   * @param page
   */
  getCommentsList({entity_id, entity_type, page}) {
    let that = this;
    return new Promise((resolve) => {
      this.$api.get('/content/comments_list', {entity_id, entity_type, page}, res => {
        resolve(that.__resDataFormat(res));
      });
    });
  }

  /**
   * 赞列表
   * @param entity_id
   * @param entity_type
   * @param page
   */
  getThumbList({entity_id, entity_type}) {
    let that = this;
    return new Promise((resolve) => {
      this.$api.get('/content/thumb_up_list', {entity_id, entity_type}, res => {
        resolve(that.__resDataFormat(res));
      });
    });
  }

  /**
   * 用户信息
   * @param other_user_id
   */
  getUserInfo(other_user_id) {
    let that = this;
    return new Promise((resolve) => {
      this.$api.get('/user_detail', {other_user_id}, res => {
        resolve(that.__resDataFormat(res));
      });
    });
  }

  /**
   * 用户信息
   * @param other_user_id
   */
  getUserInfo(other_user_id) {
    let that = this;
    return new Promise((resolve) => {
      this.$api.get('/user_detail', {other_user_id}, res => {
        resolve(that.__resDataFormat(res));
      });
    });
  }

  /**
   * 用户动态
   * @param other_user_id
   * @param page
   */
  getUserInfo(other_user_id) {
    let that = this;
    return new Promise((resolve) => {
      this.$api.get('/content/get_user_dynamic', {other_user_id, page}, res => {
        resolve(that.__resDataFormat(res));
      });
    });
  }
}

// 单列模式返回对象
let instance;
export default () => {
  if (instance) return instance;
  instance = new Life();
  return instance;
};
