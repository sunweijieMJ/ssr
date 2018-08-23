import Abstract from './Abstract';

class Mall extends Abstract {

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
   * 关注列表
   * @param created_at
   * @param feed_type
   */
  getFocusList() {
    let that = this;
    return new Promise(resolve => {
      that.$api.get('/user/personalize', {created_at: 0, feed_type: 1}, res => {
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
}

// 单列模式返回对象
let instance;
export default () => {
  if (instance) return instance;
  instance = new Mall();
  return instance;
};
