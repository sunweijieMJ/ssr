import Abstract from '../Abstract';

class Life extends Abstract {

  constructor() {
    super();
  }

  /**
   * 查询用户id
   * @param user_name 用户名
   */
  getUserId(user_name) {
    return  this.$api.get('users/ait_find_username', {user_name});
  }

  /**
   * 关注列表
   * @param created_at
   * @param feed_type
   */
  getFocusList(created_at, feed_type) {
    return this.$api.get('/user/personalize', {created_at, feed_type});
  }

  /**
   * 置顶列表
   */
  getStickList() {
    return this.$api.get('content/content_top', {});
  }

  /**
   * 热门话题
   */
  getHotTopicList() {
    return this.$api.get('/hot_topic_list', {});
  }

  /**
   * 动态列表
   * @param page
   */
  getMomentList(page) {
    return this.$api.get('content/dynamic_list', {page});
  }

  /**
   * 动态详情
   * @param entity_id
   * @param entity_type
   * @param page
   */
  getMomentDetail(entity_id) {
    return this.$api.get('content/moment_detail', {entity_id});
  }

  /**
   * 评论列表
   * @param entity_id
   * @param entity_type
   * @param page
   */
  getCommentsList({entity_id, entity_type, page}) {
    return  this.$api.get('/content/comments_list', {entity_id, entity_type, page});
  }

  /**
   * 赞列表
   * @param entity_id
   * @param entity_type
   * @param page
   */
  getThumbList({entity_id, entity_type, page}) {
    return this.$api.get('/content/thumb_up_list', {entity_id, entity_type, page});
  }

  /**
   * 用户信息
   * @param other_user_id
   */
  getUserInfo(other_user_id) {
    return this.$api.get('/user_detail', {other_user_id});
  }

  /**
   * 用户信息
   * @param other_user_id
   */
  getUserInfo(other_user_id) {
    return  this.$api.get('/user_detail', {other_user_id});
  }

  /**
   * 用户动态
   * @param other_user_id
   * @param page
   */
  getUserInfo(other_user_id, page) {
    return this.$api.get('/content/get_user_dynamic', {other_user_id, page});
  }
}

// 单列模式返回对象
let instance;
export default () => {
  if (instance) return instance;
  instance = new Life();
  return instance;
};
